import uuid
import msal
from flask import redirect, render_template, request, session, url_for, Blueprint
from planner.authentication import _build_msal_app, _load_cache, _save_cache
from flask import current_app

home = Blueprint("home", __name__, template_folder="templates")

@home.route("/")
def index():
    if not session.get("user"):
        return redirect(url_for("home.login"))
    return render_template('index.html', user=session["user"], version=msal.__version__)


@home.route("/login")
def login():
    session["state"] = str(uuid.uuid4())
    auth_url = _build_msal_app().get_authorization_request_url(
        current_app.config["SCOPE"],  # Technically we can use empty list [] to just sign in,
                           # here we choose to also collect end user consent upfront
        state=session["state"],
        redirect_uri=url_for("home.authorized", _external=True))
    return render_template('login.html', redirect=auth_url)
    # return "<a href='%s'>Login with Microsoft Identity</a>" % auth_url


# Its absolute URL must match your app's redirect_uri set in AAD
@home.route("/getAToken")  # app_config.REDIRECT_PATH
def authorized():
    if request.args.get('state') == session.get("state"):
        cache = _load_cache()
        result = _build_msal_app(cache=cache).acquire_token_by_authorization_code(
            request.args['code'],
            scopes=current_app.config["SCOPE"],  # Misspelled scope would cause an HTTP 400 error here
            redirect_uri=url_for("home.authorized", _external=True))
        if "error" in result:
            return "Login failure: %s, %s" % (
                result["error"], result.get("error_description"))
        session["user"] = result.get("id_token_claims")
        _save_cache(cache)
    return redirect(url_for("home.index"))


@home.route("/logout")
def logout():
    session.clear()  # Wipe out user and its token cache from session
    return redirect(  # Also logout from your tenant's web session
        current_app.config["AUTHORITY"] + "/oauth2/v2.0/logout" +
        "?post_logout_redirect_uri=" + url_for("home.index", _external=True))
