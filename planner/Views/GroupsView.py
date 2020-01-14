from flask import render_template, request, url_for
import json

from werkzeug.utils import redirect

import app_config
from planner import app
from planner.Views.LoginView import _get_token_from_cache


@app.route("/groups", methods=["GET", "POST"])
def group_view():
    token = _get_token_from_cache(app_config.SCOPE)
    if not token:
        return redirect(url_for("login"))
    if request.method == "POST":
        new_group = []
        with open('groups.txt') as json_file:
            data = json.load(json_file)
        for name in request.form["members"].split("\n"):
            new_group.append(name.replace("\r", ""))
        data[request.form["name"]] = new_group
        with open("groups.txt", "w") as file:
            json.dump(data, file)
    return render_template("groups.html")
