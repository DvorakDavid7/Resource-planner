from flask import Blueprint, render_template, request, json, jsonify, make_response
from planner.Models.HeaderModel import HeaderModel
from planner.Models.ProjectsListModel import ProjectListModel
from planner.Models.EditModel import EditModel
from planner.authentication import login_required
from planner.Sql.SqlWrite import SqlWrite

from planner.Models.HeaderModel import HeaderModel
from planner.Models.DataModels.DateRange import DateRange
from planner.Models.EditModel import EditModel

edit = Blueprint("edit", __name__, template_folder="templates", static_folder="static", static_url_path='/edit/static')


@edit.route('/edit/<string:user_id>', methods=["GET"])
@login_required
def edit_get(user_id):
    # date_range = DateRange(**request.args)
    date_range = DateRange("2019", "2019", "30", "52")
    header = HeaderModel()
    header.set_dateRange(date_range)
    header.set_fromDatabese()

    table = EditModel(header, user_id)
    table.set_projectDetails()
    return render_template("edit.html", body=table.toDict(), header=header.toDict())


@edit.route('/edit/save_changes/<string:user_id>', methods=["POST"])
def edit_save_changes(user_id):
    receive_data = json.loads(str(request.get_data().decode('utf-8')))
    modified_by = "ddvorak.trask.cz" # session["user"]['preferred_username']
    _make_changes(receive_data["data"], modified_by, user_id)
    headerModel = HeaderModel()
    y_start = receive_data["position"]["year_start"]
    w_start = receive_data["position"]["week_start"]
    y_end = receive_data["position"]["year_end"]
    w_end = receive_data["position"]["week_end"]
    headerModel.set_start_end_dates(y_start, y_end, w_start, w_end)
    headerModel.generate_table_header()
    editModel = EditModel(headerModel, user_id)
    editModel.generate_edit_body()
    table = {"header": headerModel.table_header, "body": editModel.edit_table}
    new_table = render_template("edit.html", title="Edit Page", table=table,  user_id=user_id)
    return make_response(jsonify({"new_table": new_table}), 200)

@edit.route('/edit/show_project_list/<string:user_id>', methods=["POST"])
def edit_show_project_list(user_id):
    projectListModel = ProjectListModel()
    projectListModel.generate_project_list()
    return make_response(jsonify({"data": projectListModel.project_list}), 200)

@edit.route('/edit/add_new_project/<string:user_id>', methods=["POST"])
def add_new_project(user_id):
    receive_data = json.loads(str(request.get_data().decode('utf-8')))
    modified_by = "ddvorak.trask.cz" # session["user"]['preferred_username']
    write_model = SqlWrite()
    headerModel = HeaderModel()
    y_start = receive_data["position"]["year_start"]
    w_start = receive_data["position"]["week_start"]
    y_end = receive_data["position"]["year_end"]
    w_end = receive_data["position"]["week_end"]
    task_type = receive_data["data"]["task_type"]
    identifier = receive_data["data"]["identifier"]
    headerModel.set_start_end_dates(y_start, y_end, w_start, w_end)
    write_model.insert_row(task_type, user_id, identifier, y_start, w_start, 0, modified_by)
    headerModel.generate_table_header()
    editModel = EditModel(headerModel, user_id)
    editModel.generate_edit_body()
    table = {"header": headerModel.table_header, "body": editModel.edit_table}
    new_table = render_template("edit.html", title="Edit Page", table=table, user_id=user_id)
    return make_response(jsonify({"new_table": new_table}), 200)

@edit.route('/edit/navigation_request_handler/<string:user_id>', methods=["POST"])
def edit_navigation(user_id):
    receive_data = json.loads(str(request.get_data().decode('utf-8')))
    headerModel = HeaderModel()
    navigation_handler(headerModel, receive_data)
    headerModel.generate_table_header()
    editModel = EditModel(headerModel, user_id)
    editModel.generate_edit_body()
    table = {"header": headerModel.table_header, "body": editModel.edit_table}
    new_table = render_template("edit.html", title="Edit Page", table=table, user_id=user_id)
    return make_response(jsonify({"new_table": new_table}), 200)

def _make_changes(changes, modified_by, user_id):
        write_model = SqlWrite()
        for change in changes:
            write_model.delete_row(change["type"], user_id, change["id"], change["year"], change["week"])
            if change["value"] != "":
                write_model.insert_row(change["type"], user_id, change["id"], change["year"], change["week"],
                                       change["value"], modified_by)

def navigation_handler(headerModel, receive_data):
    if receive_data["request_type"] == "set_range":
        headerModel.set_start_end_dates(receive_data["data"]["year_start"], receive_data["data"]["year_end"],
                                        receive_data["data"]["week_start"], receive_data["data"]["week_end"])
    elif receive_data["request_type"] == "set_date":
        if receive_data["data"]["input_type"] == "set_week":
            headerModel.set_header_based_on_week_number(receive_data["data"]["week"], receive_data["data"]["year"], 10, 10)
        elif receive_data["data"]["input_type"] == "set_date":
            headerModel.set_header_based_on_date(receive_data["data"]["day"], receive_data["data"]["month"],
                                                receive_data["data"]["year"])
    elif receive_data["request_type"] == "move":
        headerModel.set_header_based_on_move(receive_data["data"]["direction"], receive_data["data"]["week_start"],
                                            receive_data["data"]["week_end"], receive_data["data"]["year_start"],
                                            receive_data["data"]["year_end"])