from planner.Models.ProjectTableModel import ProjectTableModel
from flask import render_template, make_response, jsonify, request, json
from planner.Controllers.Controller import Controller
from planner.Models.HeaderModel import HeaderModel
from planner.Models.TableModel import TableModel
from planner.Models.ProjectEditModel import ProjectEditModel
from planner.Sql.SqlWrite import SqlWrite
from planner.Sql.SqlRead import SqlRead


class ProjectEditController(Controller):
    def __init__(self):
        super().__init__()

    # GET
    @staticmethod
    def index(project_id: str, request_parameters):
        headerModel = HeaderModel()
        y_start = request_parameters["year_start"]
        y_end = request_parameters["year_end"]
        w_start = request_parameters["week_start"]
        w_end = request_parameters["week_end"]
        headerModel.set_start_end_dates(y_start, y_end, w_start, w_end)
        headerModel.generate_table_header()

        projectEditModel = ProjectEditModel(headerModel, project_id)
        

        table = {"header": headerModel.table_header}
        data = projectEditModel.generate_edit_body(y_start, y_end, w_start, w_end, project_id)
        body = data[0]
        name_mapper = data[1]
        name_list = list(body.keys())
        return render_template("NavLayout/ProjectEdit.html", table=table, data=body, name_list=name_list, name_mapper=name_mapper)

    @staticmethod
    def save_changes(changes, modified_by):
        print(changes)
        write_model = SqlWrite()
        try:
            for change in changes:
                write_model.delete_row("project", change["worker_id"], change["project_id"], change["year"], change["week"])
                print(change["value"])
                if change["value"] != "":
                    write_model.insert_row("project", change["worker_id"], change["project_id"], change["year"], change["week"], change["value"], modified_by)
            return make_response(jsonify({}), 200)
        except Exception as err:
            return make_response(jsonify({"err": err}), 400)

    @staticmethod
    def add_worker(record, modified_by):
        write_model = SqlWrite()
        print(record)
        try:
            write_model.insert_row("project", record["worker_id"], record["project_id"], record["year"], record["week"], record["value"], modified_by)
            return make_response(jsonify({}), 200)
        except Exception as err:
            return make_response(jsonify({"err": err}), 400)

    @staticmethod
    def get_names():
        sql = SqlRead()
        name_list = sql.read_department("IA")
        return make_response(jsonify({"data": name_list}), 200)

