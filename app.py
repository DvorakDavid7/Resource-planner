import uuid
import requests
from flask import Flask, render_template, session, request, redirect, url_for
from flask_session import Session  # https://pythonhosted.org/Flask-Session
import msal
import app_config
from database import DataConvertor, Table, DataHolder, DateManager, SQL
import datetime


app = Flask(__name__)
app.config.from_object(app_config)
Session(app)

dateManager = DateManager()
dateManager.current_day = datetime.date.today()
sql = SQL(dateManager)
sql.set_date_range()
sql.set_department("IA")
department = "IA"

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
    return "<a href='%s'>Login with Microsoft Identity</a>" % auth_url

@app.route(app_config.REDIRECT_PATH)  # Its absolute URL must match your app's redirect_uri set in AAD
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

@app.route("/graphcall")
def graphcall():
    token = _get_token_from_cache(app_config.SCOPE)
    if not token:
        return redirect(url_for("login"))
    graph_data = requests.get(  # Use token to call downstream service
        app_config.ENDPOINT,
        headers={'Authorization': 'Bearer ' + token['access_token']},
        ).json()
    return render_template('display.html', result=graph_data)


@app.route("/table", methods = ["GET", "POST"]) # /table
def show_data():
    global dateManager, department
    token = _get_token_from_cache(app_config.SCOPE)
    if not token:
        return redirect(url_for("login"))

    if request.method == "POST" and request.form.get("switch"):
        print("switch: " + request.form.get("switch"))
        switch = request.form.get("switch")
        if switch == "back":
            dateManager.current_day -= datetime.timedelta(days = 10 * 7)
        elif switch == "forward":
            dateManager.current_day += datetime.timedelta(days = 10 * 7)
        sql.set_date_range()

    if request.method == "POST" and request.form.get("department"):
        print("department: " + request.form.get("department"))
        department = request.form.get("department")
        sql.set_department(department)

    if request.method == "POST" and request.form.get("addall"):
        print("addall: " + request.form.get("addall"))
        department = "BI ED AC DM SA NL IS SD EX CC BR ZA IA PO SU SL OS PD NA SK BS"
        sql.set_department(department)

    if request.method == "POST" and request.form.get("date"):
        print("date: " + request.form.get("date"))
        date = request.form.get("date").split("-")
        dateManager.current_day = datetime.date(int(date[0]), int(date[1]), int(date[2]))
        sql.set_date_range()

    if request.method == "POST" and request.form.get("week"):
        print("week: " + request.form.get("week"))
        week = request.form.get("week").split("/")
        d = str(week[1] + "-W"+week[0])
        date = datetime.datetime.strptime(d + '-1', '%G-W%V-%u')
        date = str(date).split(" ")[0]
        date = date.split("-")
        dateManager.current_day = datetime.date(int(date[0]), int(date[1]), int(date[2]))
        sql.set_date_range()

    dataConvertor = DataConvertor(sql)
    dataHolder = DataHolder(dataConvertor)
    table = Table(dataHolder)
    table.load_header()
    table.load_content_overview()
    return render_template('table.html', table = table, department=department)


@app.route('/edit/<string:question_id>')
def edit(question_id):
    global dateManager
    token = _get_token_from_cache(app_config.SCOPE)
    if not token:
        return redirect(url_for("login"))
    userID = question_id
    dataConvertor = DataConvertor(sql)
    dataHolder = DataHolder(dataConvertor)
    table = Table(dataHolder)
    table.load_header()
    table.load_content_edit(userID)
    return render_template('edit.html', table = table, user_id = userID)


@app.route('/test', methods = ["GET", "POST"])
def test():
    userID = "jadam"

    if request.method == "POST":
        print(dict(request.form))
    dataConvertor = DataConvertor(sql)
    dataHolder = DataHolder(dataConvertor)
    table = Table(dataHolder)
    table.load_header()
    table.load_content_edit(userID)
    return render_template('test.html', table = table)


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

if __name__ == "__main__":
    app.run(debug = True, port = 5000)  # parametr debud = True okamžité provedení změny
