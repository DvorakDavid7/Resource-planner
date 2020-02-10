from flask import render_template, make_response, jsonify, request, json
from planner.Controllers.Controller import Controller


class TableController(Controller):
    def __init__(self):
        super().__init__()
        self.department = "IA"
        self.table_header = {"year_start": "", "year_end": "", "weeks": [], "working_hours": {}, "dates": []}
        self.table_body = []

    # GET
    def index(self, current_user):
        self.set_start_end_dates("2020", "2020", "1", "21")
        self.generate_table_header()
        data = self.generate_table_body()
        return render_template("table.html", title="Main Table", table=data, url_root=request.url_root)
    
    # POST
    def navigation_request_handler(self, request_data): 
        self.navigation_handler(request_data)
        self.generate_table_header()
        data = self.generate_table_body()
        new_table = render_template("table.html", title="Main Table", table=data, url_root=request.url_root)
        return make_response(jsonify({"new_table": new_table}), 200)

    # POST
    def set_department_request_handler(self, request_data):
        self.set_department(request_data["data"])
        self.set_start_end_dates("2020", "2020", "1", "21")
        self.generate_table_header()
        data = self.generate_table_body()
        new_table = render_template("table.html", title="Main Table", table=data, url_root=request.url_root)
        return make_response(jsonify({"new_table": new_table}), 200)

    def generate_table_body(self, name_filter=[]):
        result_row = {"user_id": "", "department": "", "name": "", "values": {}}
        plan = {}
        name_list_table = self.read_model.read_department(self.department)
        for i in range(len(name_list_table)):
            user_id = name_list_table[i][0]
            if len(name_filter) != 0:
                if user_id not in name_filter:
                    continue
            department = name_list_table[i][1]
            name = name_list_table[i][2]
            for week in self.table_header["weeks"]:
                plan[int(week)] = ""
            worker_plan_table = self.read_model.read_worker_summary_plan(user_id, self.year_start,
                                                                         self.week_start, self.year_end, self.week_end)
            for row in worker_plan_table:
                plan[row[0]] = row[1]
            result_row["user_id"] = user_id
            result_row["department"] = department
            result_row["name"] = name
            result_row["values"] = plan.copy()
            self.table_body.append(result_row.copy())
        return {"header": self.table_header, "body": self.table_body}


    def set_department(self, department):
        if len(department) == 2:
            self.department = department
        else:
            department = str(tuple(department.split(" ")))
            self.department = department


    def groups_list(self):
        result = []
        with open('groups.txt') as json_file:
            data = json.load(json_file)
        for i in data.keys():
            result.append(i)
        return result

    def load_group(self, groupe):
        with open('groups.txt') as json_file:
            data = json.load(json_file)
        # members = data[groupe]
        # data = self.generate_table_data(members)
        new_table = render_template("table.html", title="Main Table", table=data, url_root=request.url_root)
        return make_response(jsonify({"new_table": new_table}), 200)
