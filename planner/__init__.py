import uuid
import msal
from flask import (Flask, json, redirect, render_template, request, session, url_for)
from flask_session import Session

import app_config
from planner.Controllers.EditController import EditController
from planner.Controllers.GroupsController import GroupsController
from planner.Controllers.TableController import TableController
from planner.Controllers.ColorSettingController import ColorSettingController


# v Azure webapp aplikace bezi za reverse proxy, ktera terminuje SSL,
# je ale potreba prebrat spravne schema, jinak by Flask generoval spatny url (http na misto https)
class ReverseProxied(object):
    def __init__(self, app):
        self.app = app

    def __call__(self, environ, start_response):
        scheme = environ.get('HTTP_X_FORWARDED_PROTO')
        if scheme:
            environ['wsgi.url_scheme'] = scheme
        return self.app(environ, start_response)


app = Flask(__name__)
app.wsgi_app = ReverseProxied(app.wsgi_app)
app.config.from_object(app_config)
Session(app)


@app.route("/")
def index():
    if not session.get("user"):
        return redirect(url_for("login"))
    return render_template('index.html', user=session["user"], version=msal.__version__)


@app.route("/login")
def login():
    session["state"] = str(uuid.uuid4())
    auth_url = _build_msal_app().get_authorization_request_url(
        app_config.SCOPE,  # Technically we can use empty list [] to just sign in,
                           # here we choose to also collect end user consent upfront
        state=session["state"],
        redirect_uri=url_for("authorized", _external=True))
    return render_template('login.html', redirect=auth_url)
    # return "<a href='%s'>Login with Microsoft Identity</a>" % auth_url


# Its absolute URL must match your app's redirect_uri set in AAD
@app.route(app_config.REDIRECT_PATH)
def authorized():
    if request.args.get('state') == session.get("state"):
        cache = _load_cache()
        result = _build_msal_app(cache=cache).acquire_token_by_authorization_code(
            request.args['code'],
            scopes=app_config.SCOPE,  # Misspelled scope would cause an HTTP 400 error here
            redirect_uri=url_for("authorized", _external=True))
        if "error" in result:
            return "Login failure: %s, %s" % (
                result["error"], result.get("error_description"))
        session["user"] = result.get("id_token_claims")
        _save_cache(cache)
    return redirect(url_for("index"))


@app.route("/logout")
def logout():
    session.clear()  # Wipe out user and its token cache from session
    return redirect(  # Also logout from your tenant's web session
        app_config.AUTHORITY + "/oauth2/v2.0/logout" +
        "?post_logout_redirect_uri=" + url_for("index", _external=True))


# TABLE
@app.route('/table', methods=["GET"])
def table_get():
    token = _get_token_from_cache(app_config.SCOPE)
    if not token:
        return redirect(url_for("login"))
    return TableController.index()


@app.route('/table/navigation_request_handler', methods=["POST"])
def table_navigation():
    receive_data = json.loads(str(request.get_data().decode('utf-8')))
    tableController = TableController()
    return tableController.navigation_request_handler(receive_data)


@app.route('/table/set_department', methods=["POST"])
def table_set_department():
    receive_data = json.loads(str(request.get_data().decode('utf-8')))
    return TableController.set_department_request_handler(receive_data)


# EDIT

@app.route('/edit/<string:user_id>', methods=["GET"])
def edit(user_id):
    token = _get_token_from_cache(app_config.SCOPE)
    if not token:
        return redirect(url_for("login"))
    return EditController.index(user_id, request.args)


@app.route('/edit/save_changes/<string:user_id>', methods=["POST"])
def edit_save_changes(user_id):
    receive_data = json.loads(str(request.get_data().decode('utf-8')))
    return EditController.save_changes(receive_data, session["user"]['preferred_username'], user_id)


@app.route('/edit/show_project_list/<string:user_id>', methods=["POST"])
def edit_show_project_list(user_id):
    return EditController.show_project_list()


@app.route('/edit/add_new_project/<string:user_id>', methods=["POST"])
def add_new_project(user_id):
    receive_data = json.loads(str(request.get_data().decode('utf-8')))
    return EditController.add_new_project(user_id, receive_data, session["user"]['preferred_username'])


@app.route('/edit/navigation_request_handler/<string:user_id>', methods=["POST"])
def edit_navigation(user_id):
    receive_data = json.loads(str(request.get_data().decode('utf-8')))
    editController = EditController()
    return editController.navigation_request_handler(user_id, receive_data)


# GROUPS
@app.route('/groups', methods=["GET"])
def groups():
    token = _get_token_from_cache(app_config.SCOPE)
    if not token:
        return redirect(url_for("login"))
    return GroupsController.index()


@app.route('/groups/show_groups', methods=["POST"])
def show_groups():
    groupsController = GroupsController()
    return groupsController.show_groups()


@app.route('/groups/save_group', methods=["POST"])
def groups_save_group():
    return GroupsController.save_group(request.form)


@app.route('/groups/delete_group', methods=["POST"])
def groups_delete_group():
    receive_data = json.loads(str(request.get_data().decode('utf-8')))
    return GroupsController.delete_group(receive_data)


@app.route('/groups/group_members', methods=["POST"])
def groups_group_members():
    receive_data = json.loads(str(request.get_data().decode('utf-8')))
    return GroupsController.group_members(receive_data)

# COLOR SETTING
@app.route('/color_setting', methods=["GET"])
def color_setting():
    token = _get_token_from_cache(app_config.SCOPE)
    if not token:
        return redirect(url_for("login"))
    return ColorSettingController.index()


@app.route('/color_setting/save', methods=["POST"])
def color_setting_save():
    receive_data = json.loads(str(request.get_data().decode('utf-8')))
    return ColorSettingController.save(receive_data)


@app.route('/color_setting/send_data', methods=["POST"])
def color_setting_send_data():
    return ColorSettingController.send_data()


def _load_cache():
    cache = msal.SerializableTokenCache()
    if session.get("token_cache"):
        cache.deserialize(session["token_cache"])
    return cache


def _save_cache(cache):
    if cache.has_state_changed:
        session["token_cache"] = cache.serialize()


def _build_msal_app(cache=None):
    return msal.ConfidentialClientApplication(
        app_config.CLIENT_ID, authority=app_config.AUTHORITY,
        client_credential=app_config.CLIENT_SECRET, token_cache=cache)


def _get_token_from_cache(scope=None):
    cache = _load_cache()  # This web app maintains one cache per session
    cca = _build_msal_app(cache=cache)
    accounts = cca.get_accounts()
    if accounts:  # So all account(s) belong to the current signed-in user
        result = cca.acquire_token_silent(scope, account=accounts[0])
        _save_cache(cache)
        return result
