from flask import jsonify, make_response, request, render_template

from planner.Controllers.Controller import Controller
from planner.Models.WriteModel import WriteModel
from planner.Models.ReadModel import ReadModel


class EditController(Controller):
    def __init__(self, user_id, request_parameters):
        super().__init__()
        self.year_start = request_parameters["year_start"]
        self.year_end = request_parameters["year_end"]
        self.week_start = request_parameters["week_start"]
        self.week_end = request_parameters["week_end"]
        self.user_id = user_id
        self.table_header = {"year_start": "", "year_end": "", "weeks": [], "working_hours": {}, "dates": []}
    
    # GET
    def index(self, user_id):
        self.generate_table_header()
        data = self.generate_edit_body()
        return render_template("edit.html", title="Edit Page", table=data, user_id=user_id)
    
    # POST
    def save_changes(self, receive_data):
        self.make_changes(receive_data["data"], "mbendik")    # session["user"]['preferred_username']
        position = receive_data["position"]
        self.set_start_end_dates(position["year_start"], position["year_end"],
                                                position["week_start"], position["week_end"])
        self.generate_table_header()
        data = self.generate_edit_body()
        new_table = render_template("edit.html", title="Edit Page", table=data,
                                    url_root=request.url_root, user_id=self.user_id)
        return make_response(jsonify({"new_table": new_table}), 200)
    
    # POST
    def show_project_list(self):
        project_list =  {"projects": self.read_model.read_project_list("project"),
                        "opportunities": self.read_model.read_project_list("opportunity")}
        return make_response(jsonify({"data": project_list}), 200)

    # POST
    def add_new_project(self, receive_data):
        write_model = WriteModel()
        position = receive_data["position"]
        self.set_start_end_dates(position["year_start"], position["year_end"], position["week_start"], position["week_end"])
        write_model.insert_row(receive_data["data"]["task_type"], self.user_id, receive_data["data"]["identifier"], position["year_start"], position["week_start"], 0, "ddvorak")  # session["user"]['preferred_username']
        self.generate_table_header()
        data = self.generate_edit_body()
        new_table = render_template("edit.html", title="Edit Page", table=data,
                                    url_root=request.url_root, user_id=self.user_id)
        return make_response(jsonify({"new_table": new_table}), 200)
    
    # POST
    def navigation_request_handler(self, request_data):
        self.navigation_handler(request_data)
        self.generate_table_header()
        data = self.generate_edit_body()
        new_table = render_template("edit.html", title="Edit Page", table=data,
                                    url_root=request.url_root, user_id=self.user_id)
        return make_response(jsonify({"new_table": new_table}), 200)
    

    def generate_edit_body(self) -> {}:
        projects = self.__id_values("project")
        opportunity = self.__id_values("opportunity")
        for row in projects:
            project_details = self.read_model.read_edit_data_details("project", row["id"])[0]
            row["name"] = project_details[0]
            row["project_manager"] = project_details[1] if project_details[1] else ""
        for row in opportunity:
            opportunity_details = self.read_model.read_edit_data_details("opportunity", row["id"])[0]
            row["name"] = opportunity_details[0]
            row["project_manager"] = opportunity_details[1] if opportunity_details[1] else ""
            row["status"] = opportunity_details[2]
        return {"header": self.table_header, "body": {"projects": projects, "opportunity": opportunity}}

    def __id_values(self, data_for) -> []:
        plan = {}
        result_row = {}
        result = []
        worker_plan_table = self.read_model.read_worker_plan(data_for, self.user_id, self.year_start,
                                                             self.week_start, self.year_end, self.week_end)
        for week in self.table_header["weeks"]:
            plan[int(week)] = ""
        for row in worker_plan_table:
            task_id = row[0]
            week = row[1]
            planned = row[2]
            current_value = 0
            if task_id in result_row:
                current_value = result_row[task_id][int(week)]
            else:
                result_row[task_id] = plan.copy()
            if current_value and planned and current_value != 0:
                result_row[task_id][week] = planned + current_value
            else:
                result_row[task_id][week] = planned
        for id_key in result_row:
            result.append({"id": id_key,  "values": result_row[id_key]})
        return result

    def make_changes(self, changes, modified_by):
        write_model = WriteModel()
        for change in changes:
            write_model.delete_row(change["type"], self.user_id, change["id"], change["year"], change["week"])
            if change["value"] != "":
                write_model.insert_row(change["type"], self.user_id, change["id"], change["year"], change["week"],
                                       change["value"], modified_by)
