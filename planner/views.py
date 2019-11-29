import uuid
from planner import app
from flask import render_template, session, request, redirect, url_for, json
import msal
import app_config
import datetime
import requests

from planner.models import DateManager, Table
from planner.sql import SQL


sql = SQL()
dateManager = DateManager()
table = Table(sql, dateManager)

current_day = datetime.date.today()
table.set_date_range(current_day)
table.set_department("IA")


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

@app.route('/table', methods = ["GET", "POST"])
def test():
    if request.method == "POST":
        req = request.form.get("switch")
        if req == "back":
            print(req)
            table.current_day -= datetime.timedelta(days = 7 * 10)
            table.set_date_range(table.current_day)

        elif req == "forward":
            print(req)
            table.current_day += datetime.timedelta(days = 7 * 10)
            table.set_date_range(table.current_day)

        elif request.form.get("date"):
            print(request.form.get("date"))
            req = request.form.get("date").split("-")
            year = int(req[0])
            month = int(req[1])
            day = int(req[2])
            date = datetime.date(year, month, day)
            table.set_date_range(date)

        elif request.form.get("week"):
            print(request.form.get("week"))
            week = request.form.get("week").split("/")
            d = str(week[1] + "-W"+week[0])
            date = datetime.datetime.strptime(d + '-1', '%G-W%V-%u')
            date = str(date).split(" ")[0]
            date = date.split("-")
            table.set_date_range(datetime.date(int(date[0]), int(date[1]), int(date[2])))

        elif request.form.get("department"):
            departments = request.form.get("department")
            table.set_department(departments)

    test = table.complete_overwie_table()
    return render_template("table.html",table = test, departments = table.department)


@app.route('/edit/<string:user_id>', methods = ["GET", "POST"])
def edit(user_id):
    if request.method == "POST":
        reference = table.complete_edit_table(user_id)
        receve_data = json.loads(str(request.get_data().decode('utf-8')))
        for i in range(len(reference["body"]["projects"])):
            for week in reference["body"]["projects"][i]["values"].keys():
                default_value = str(reference["body"]["projects"][i]["values"][week])
                receve_value = str(receve_data["body"]["projects"][i]["values"][str(week)])

                if reference["header"]["year_start"] == reference["header"]["year_end"]:
                    rok = reference["header"]["year_start"]
                else:
                    if week > reference["header"]["weeks"][10]:
                         rok = reference["header"]["year_start"]
                    else:
                        rok = reference["header"]["year_end"]

                if receve_value != "":
                    planhod = int(receve_value)
                else:
                    planhod = None

                if default_value != receve_value:
                    if default_value == "":
                        result = {
                                    "action":"insert",
                                    "Tyden": week,
                                    "Rok": rok,
                                    "PlanHod": planhod,
                                    "ModifiedBy": session["user"]['preferred_username'],
                                    "ProjektID": receve_data["body"]["projects"][i]["project_id"],
                                    "ZakazkaID": receve_data["body"]["projects"][i]["zakazka_id"],
                                    "PracovnikID": user_id,
                                    }
                        print(result)
                    else:
                        result = {
                                    "action":"update",
                                    "Tyden": week,
                                    "Rok": rok,
                                    "PlanHod":  planhod,
                                    "ModifiedBy": session["user"]['preferred_username'],
                                    "ProjektID": receve_data["body"]["projects"][i]["project_id"],
                                    "ZakazkaID": receve_data["body"]["projects"][i]["zakazka_id"],
                                    "PracovnikID": user_id,
                                    }
                        print(result)

        for i in range(len(reference["body"]["opportunity"])):
            for week in reference["body"]["opportunity"][i]["values"].keys():
                default_value = str(reference["body"]["opportunity"][i]["values"][week])
                receve_value = str(receve_data["body"]["opportunity"][i]["values"][str(week)])

                if reference["header"]["year_start"] == reference["header"]["year_end"]:
                    rok = reference["header"]["year_start"]
                else:
                    if week > reference["header"]["weeks"][10]:
                         rok = reference["header"]["year_start"]
                    else:
                        rok = reference["header"]["year_end"]

                if receve_value != "":
                    planhod = int(receve_value)
                else:
                    planhod = None

                if default_value != receve_value:
                    if default_value == "":
                        result = {
                                    "action":"insert",
                                    "Tyden": week,
                                    "Rok": rok,
                                    "PlanHod": planhod,
                                    "ModifiedBy": session["user"]['preferred_username'],
                                    "ProjektID": None,
                                    "ZakazkaID": receve_data["body"]["opportunity"][i]["zakazka_id"],
                                    "PracovnikID": user_id,
                                    }
                        print(result)
                    else:
                        result = {
                                    "action":"update",
                                    "Tyden": week,
                                    "Rok": rok,
                                    "PlanHod":  planhod,
                                    "ModifiedBy": session["user"]['preferred_username'],
                                    "ProjektID": None,
                                    "ZakazkaID": receve_data["body"]["opportunity"][i]["zakazka_id"],
                                    "PracovnikID": user_id,
                                    }
                        print(result)


    test = table.complete_edit_table(user_id)
    return render_template("edit.html",table = test, user_id = user_id)


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