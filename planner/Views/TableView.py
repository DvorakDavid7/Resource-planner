from werkzeug.utils import redirect

import app_config
from planner import app
from flask import request, render_template, json, jsonify, make_response, url_for

from planner.Controllers.EditController import EditController
from planner.Controllers.TableController import TableController
from planner.Views.LoginView import _get_token_from_cache


@app.route('/table', methods=["GET", "POST"])
def table_view():
    token = _get_token_from_cache(app_config.SCOPE)
    if not token:
        return redirect(url_for("login"))
    table_controller = TableController()
    table_controller.set_start_end_dates("2020", "2020", "1", "21")
    if request.method == "GET":
        data = table_controller.generate_table_data()
        return render_template("table.html", title="Main Table", table=data, url_root=request.url_root)
    if request.method == "POST":
        receive_data = json.loads(str(request.get_data().decode('utf-8')))
        if table_controller.navigation_handler(receive_data):
            return table_controller.generate_response()
        if receive_data["request_type"] == "set_department":
            table_controller.set_department(receive_data["data"])
            return table_controller.generate_response()
        if receive_data["request_type"] == "show_groups":
            return make_response(jsonify({"data": table_controller.groups_list()}), 200)
        if receive_data["request_type"] == "load_groups":
            return table_controller.load_group(receive_data["data"])
    return "table"
