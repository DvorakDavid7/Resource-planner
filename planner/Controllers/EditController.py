from flask import jsonify, make_response, render_template

from planner.Controllers.Controller import Controller
from planner.Models.EditModel import EditModel
from planner.Models.HeaderModel import HeaderModel
from planner.Models.ProjectsListModel import ProjectListModel
from planner.Sql.SqlWrite import SqlWrite


class EditController(Controller):
    def __init__(self):
        super().__init__()

    # GET
    @staticmethod
    def index(user_id, request_parameters):
        headerModel = HeaderModel()
        y_start = request_parameters["year_start"]
        y_end = request_parameters["year_end"]
        w_start = request_parameters["week_start"]
        w_end = request_parameters["week_end"]
        headerModel.set_start_end_dates(y_start, y_end, w_start, w_end)
        headerModel.generate_table_header()

        editModel = EditModel(headerModel, user_id)
        editModel.generate_edit_body()
        table = {"header": headerModel.table_header, "body": editModel.edit_table}
        return render_template("NavLayout/edit.html", title="Edit Page", table=table, user_id=user_id)
    
    # POST
    @staticmethod
    def save_changes(receive_data, modified_by, user_id):
        EditController()._make_changes(receive_data["data"], modified_by, user_id)
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
    
    # POST
    @staticmethod
    def show_project_list():
        projectListModel = ProjectListModel()
        projectListModel.generate_project_list()
        return make_response(jsonify({"data": projectListModel.project_list}), 200)

    # POST
    @staticmethod
    def add_new_project(user_id, receive_data, modified_by):
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
    
    # POST
    def navigation_request_handler(self, user_id, request_data):
        headerModel = HeaderModel()
        self.navigation_handler(headerModel, request_data)
        headerModel.generate_table_header()
        editModel = EditModel(headerModel, user_id)
        editModel.generate_edit_body()
        table = {"header": headerModel.table_header, "body": editModel.edit_table}
        new_table = render_template("edit.html", title="Edit Page", table=table, user_id=user_id)
        return make_response(jsonify({"new_table": new_table}), 200)

    @staticmethod
    def _make_changes(changes, modified_by, user_id):
        write_model = SqlWrite()
        for change in changes:
            write_model.delete_row(change["type"], user_id, change["id"], change["year"], change["week"])
            if change["value"] != "":
                write_model.insert_row(change["type"], user_id, change["id"], change["year"], change["week"],
                                       change["value"], modified_by)
