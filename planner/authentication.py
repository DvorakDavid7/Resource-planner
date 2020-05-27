import msal
from flask import session, redirect, url_for
from functools import wraps
from flask import current_app


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
        current_app.config["CLIENT_ID"], authority=current_app.config["AUTHORITY"],
        client_credential=current_app.config["CLIENT_SECRET"], token_cache=cache)


def _get_token_from_cache(scope=None):
    cache = _load_cache()  # This web app maintains one cache per session
    cca = _build_msal_app(cache=cache)
    accounts = cca.get_accounts()
    if accounts:  # So all account(s) belong to the current signed-in user
        result = cca.acquire_token_silent(scope, account=accounts[0])
        _save_cache(cache)
        return result


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = _get_token_from_cache(current_app.config["SCOPE"])
        if not token:
            return redirect(url_for("home.login"))
        return f(*args, **kwargs)
    return decorated_function
