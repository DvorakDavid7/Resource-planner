from flask import render_template, make_response, jsonify, request, json
from planner.Controllers.Controller import Controller
from planner.Models.HeaderModel import HeaderModel
from planner.Models.TableModel import TableModel


class TableController(Controller):
    def __init__(self):
        super().__init__()

    # GET
    @staticmethod
    def index():
        headerModel = HeaderModel()
        headerModel.set_default_dates()
        # headerModel.set_start_end_dates("2020", "2020", "1", "21")
        headerModel.generate_table_header()

        tableModel = TableModel(headerModel)
        tableModel.set_name_list_department("IA")
        tableModel.generate_table_body()

        table = {"header": headerModel.table_header, "body": tableModel.table_body}
        return render_template("NavLayout/table.html", title="Main Table", table=table, url_root=request.url_root)

    # POST
    @staticmethod
    def set_department_request_handler(request_data):
        headerModel = HeaderModel()
        headerModel.set_default_dates()
        # headerModel.set_start_end_dates("2020", "2020", "1", "21")
        headerModel.generate_table_header()
        tableModel = TableModel(headerModel)
        if request_data["request_type"] == "set_department":
            tableModel.set_name_list_department(request_data["data"])
        elif request_data["request_type"] == "load_groups":
            with open("data/groups.txt", "r", encoding='utf8') as file:
                data = json.load(file)
            tableModel.set_name_list_group(data[request_data["data"]])
        elif request_data["request_type"] == "set_name_list":
            tableModel.set_name_list_group(request_data["data"])
        else:
            return "Bad Request"
        tableModel.generate_table_body()
        table = {"header": headerModel.table_header, "body": tableModel.table_body}
        new_table = render_template("table.html", title="Main Table", table=table, url_root=request.url_root)
        return make_response(jsonify({"new_table": new_table}), 200)

    # POST
    def navigation_request_handler(self, request_data):
        headerModel = HeaderModel()
        self.navigation_handler(headerModel, request_data)
        headerModel.generate_table_header()

        tableModel = TableModel(headerModel)
        tableModel.set_name_list_group(request_data["name_list"])
        tableModel.generate_table_body()

        table = {"header": headerModel.table_header, "body": tableModel.table_body}
        new_table = render_template("table.html", title="Main Table", table=table, url_root=request.url_root)
        return make_response(jsonify({"new_table": new_table}), 200)
