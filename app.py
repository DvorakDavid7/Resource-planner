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


@app.route('/edit/<string:question_id>', methods = ["GET", "POST"])
def edit(question_id):
    token = _get_token_from_cache(app_config.SCOPE)
    if not token:
        return redirect(url_for("login"))
    global dateManager
    def set_year():
        rok = ""
        if table.y_start != table.y_end:
            if 1 <= int(tyden) < 15:
                rok = table.y_end
            else:
                rok = table.y_start
        else:
            rok = table.y_start
        return rok
    def rebuild_data_content(): # keys odpovídají requestu z FE použití pro porovnání změn vůči FE
        data = {}
        for i in range(len(table.rows_complet)):
            for j in range(len(table.weeks)):
                data[str(i) + "-" + str(table.weeks[j])] = table.content_complet[table.rows_complet[i]][table.weeks[j]]
        return data
    def separates_differences(): # vrací hodnoty odlišné od BE
        different = []
        data = rebuild_data_content()
        req = dict(request.form)
        for i in req.keys():
            if str(data[i]) != str(req[i]):
                different.append({i : req[i]})
        return different
    userID = question_id
    sql.set_date_range()
    dataConvertor = DataConvertor(sql)
    dataHolder = DataHolder(dataConvertor)
    table = Table(dataHolder)
    table.load_header()
    table.load_content_edit(userID)

    if request.method == "POST":
        result = []
        different = separates_differences()
        for record in different:
            row = int(str(list(record.keys())[0]).split("-")[0])
            project_ids = list(dataConvertor.get_edit_plan_projects_data(userID).keys())
            zakazka_ids = list(table.rows_complet[row].split(" "))
            PlanHod = record[str(list(record.keys())[0])]
            tyden = str(list(record.keys())[0]).split("-")[1]
            if row < len(project_ids):
                ProjektID = project_ids[row]
            else:
                ProjektID = None
            ZakazkaID = zakazka_ids[0]
            result.append({
                "Tyden": tyden,
                "Rok": set_year(),
                "PlanHod":  PlanHod,
                "ModifiedBy": session["user"]['preferred_username'],
                "ProjektID": ProjektID,
                "ZakazkaID": ZakazkaID,
                "PracovnikID": userID
            })
        for row in result:
            is_in_database = sql.read_find_record_in_database(row["PracovnikID"], row["Rok"], row["Tyden"], row["ZakazkaID"], row["ProjektID"])
            if is_in_database == []:
                dataConvertor.insert_into_database(result)
            else:
                dataConvertor.update_row_in_database(result)
        sql.set_date_range()

    return render_template('edit.html', table = table, user_id = userID)


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
