from flask import request, json, jsonify, make_response, session, redirect, url_for
from flask.templating import render_template

import app_config
from planner import app
from planner.Controllers.EditController import EditController
from planner.Views.LoginView import _get_token_from_cache


@app.route('/edit/<string:user_id>', methods=["GET", "POST"])
def edit_view(user_id):
    token = _get_token_from_cache(app_config.SCOPE)
    if not token:
        return redirect(url_for("login"))
    edit_controller = EditController(user_id, request.args)
    if request.method == "GET":
        data = edit_controller.generate_edit_data()
        return render_template("edit.html", title="Edit Page", table=data, user_id=user_id)
    if request.method == "POST":
        receive_data = json.loads(str(request.get_data().decode('utf-8')))
        if edit_controller.navigation_handler(receive_data):
            return edit_controller.generate_response()
        if receive_data["request_type"] == "edit_changes":
            edit_controller.make_changes(receive_data["data"], session["user"]['preferred_username'])
            position = receive_data["position"]
            edit_controller.set_start_end_dates(position["year_start"], position["year_end"],
                                                position["week_start"], position["week_end"])
            return edit_controller.generate_response()
        if receive_data["request_type"] == "show_project_list":
            return make_response(jsonify({"data": edit_controller.project_list()}), 200)
        if receive_data["request_type"] == "add_new_project":
            position = receive_data["position"]
            edit_controller.set_start_end_dates(position["year_start"], position["year_end"],
                                                position["week_start"], position["week_end"])
            edit_controller.add_new_project(receive_data["data"]["task_type"], receive_data["data"]["identifier"],
                                            session["user"]['preferred_username'],
                                            position["year_start"], position["week_start"])
            return edit_controller.generate_response()
    return "Bad request"
