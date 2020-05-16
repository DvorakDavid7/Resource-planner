from flask import Blueprint, render_template, request, json, jsonify, make_response
from planner.Models.HeaderModel import HeaderModel
from planner.Models.ProjectEditModel import ProjectEditModel
from planner.Sql.SqlRead import SqlRead
from planner.Sql.SqlWrite import SqlWrite

alocation = Blueprint("alocation", __name__, template_folder="templates", static_folder="static", static_url_path='/alocation/static')


@alocation.route('/project_edit/<string:project_id>', methods=["GET"])
def project_edit(project_id):
    headerModel = HeaderModel()
    y_start = request.args["year_start"]
    y_end = request.args["year_end"]
    w_start = request.args["week_start"]
    w_end = request.args["week_end"]
    headerModel.set_start_end_dates(y_start, y_end, w_start, w_end)
    headerModel.generate_table_header()

    projectEditModel = ProjectEditModel(headerModel, project_id)
    
    table = {"header": headerModel.table_header}
    data = projectEditModel.generate_edit_body(y_start, y_end, w_start, w_end, project_id)
    body = data[0]
    name_mapper = data[1]
    name_list = list(body.keys())
    return render_template("ProjectEdit.html", table=table, data=body, name_list=name_list, name_mapper=name_mapper)

@alocation.route('/project_edit/get_names', methods=["GET"])
def project_edit_get_names():
    sql = SqlRead()
    name_list = sql.read_department("IA")
    return make_response(jsonify({"data": name_list}), 200)


@alocation.route('/project_edit/save_changes', methods=["POST"])
def project_edit_save_changes():
    receive_data = json.loads(str(request.get_data().decode('utf-8')))
    modified_by = "ddvorak@trask.cz" # session["user"]['preferred_username']
    print(receive_data)
    write_model = SqlWrite()
    try:
        for change in receive_data:
            write_model.delete_row("project", change["worker_id"], change["project_id"], change["year"], change["week"])
            print(change["value"])
            if change["value"] != "":
                write_model.insert_row("project", change["worker_id"], change["project_id"], change["year"], change["week"], change["value"], modified_by)
        return make_response(jsonify({}), 200)
    except Exception as err:
        return make_response(jsonify({"err": err}), 400)


@alocation.route('/project_edit/add_worker', methods=["POST"])
def project_edit_add_worker():
    record = json.loads(str(request.get_data().decode('utf-8')))
    modified_by = "ddvorak@trask.cz" # session["user"]['preferred_username']
    write_model = SqlWrite()
    print(record)
    try:
        write_model.insert_row("project", record["worker_id"], record["project_id"], record["year"], record["week"], record["value"], modified_by)
        return make_response(jsonify({}), 200)
    except Exception as err:
        return make_response(jsonify({"err": err}), 400)
