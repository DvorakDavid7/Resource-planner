import uuid
import msal
from flask import (Flask, json, jsonify, make_response, redirect,
                   render_template, request, session, url_for)
from flask_session import Session

import app_config
from planner.Controllers.EditController import EditController
from planner.Controllers.TableController import TableController
from planner.Controllers.ColorSettingController import ColorSettingController


app = Flask(__name__)
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

@app.route('/table_test', methods=["GET"])
def table_get():
    tableController = TableController()
    return tableController.index(session["user"]['preferred_username'])

@app.route('/table_test/navigation_request_handler', methods=["POST"])
def table_navigation():
    receive_data = json.loads(str(request.get_data().decode('utf-8')))
    tableController = TableController()
    return tableController.navigation_request_handler(receive_data)

@app.route('/table_test/set_department', methods=["POST"])
def table_set_department():
    receive_data = json.loads(str(request.get_data().decode('utf-8')))
    tableController = TableController()
    return tableController.set_department_request_handler(receive_data)


# EDIT

@app.route('/edit/<string:user_id>', methods=["GET"])
def edit(user_id):
    editController = EditController(user_id, request.args)
    return editController.index(user_id)

@app.route('/edit/save_changes/<string:user_id>', methods=["POST"])
def edit_save_changes(user_id):
    receive_data = json.loads(str(request.get_data().decode('utf-8')))
    editController = EditController(user_id, request.args)
    return editController.save_changes(receive_data)

@app.route('/edit/show_project_list/<string:user_id>', methods=["POST"])
def edit_show_project_list(user_id):
    editController = EditController(user_id, request.args)
    return editController.show_project_list()

@app.route('/edit/add_new_project/<string:user_id>', methods=["POST"])
def add_new_project(user_id):
    receive_data = json.loads(str(request.get_data().decode('utf-8')))
    editController = EditController(user_id, request.args)
    return editController.add_new_project(receive_data)

@app.route('/edit/navigation_request_handler/<string:user_id>', methods=["POST"])
def edit_navigation(user_id):
    receive_data = json.loads(str(request.get_data().decode('utf-8')))
    editController = EditController(user_id, request.args)
    return editController.navigation_request_handler(receive_data)


# COLOR SETTING

@app.route('/color_setting', methods=["GET"])
def color_setting():
    colorSettingController = ColorSettingController()
    return colorSettingController.index()

@app.route('/color_setting/save', methods=["POST"])
def color_setting_save():
    receive_data = json.loads(str(request.get_data().decode('utf-8')))
    colorSettingController = ColorSettingController()
    return colorSettingController.save(receive_data)

@app.route('/color_setting/send_data', methods=["POST"])
def color_setting_send_data():
    colorSettingController = ColorSettingController()
    return colorSettingController.send_data()





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
