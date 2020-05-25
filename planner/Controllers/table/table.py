from planner.Models.DataModels.DateRange import DateRange
from flask import Blueprint, render_template, request, json, jsonify, make_response
from planner.Models.HeaderModel import HeaderModel
from planner.Models.TableModel import TableModel
from planner.authentication import login_required

import time

table = Blueprint("table", __name__, template_folder="templates")

@table.route('/table', methods=["GET"])
@login_required
def table_get():
    start = time.time()
    date_range = DateRange("2020", "2020", "1", "22")
    header = HeaderModel()
    header.set_dateRange(date_range)
    header.set_fromDatabese()

    tableModel = TableModel(header)
    tableModel.set_workerList("IA")
    tableModel.set_values()    
    print(time.time() - start)

    return render_template("table.html", header=header.toDict(), tableModel=tableModel.toDict(), mimetype='text/javascript')


@table.route('/table/navigation_request_handler', methods=["POST"])
def table_navigation():
    request_data = json.loads(str(request.get_data().decode('utf-8')))
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


@table.route('/table/set_department', methods=["POST"])
def table_set_department():
    request_data = json.loads(str(request.get_data().decode('utf-8')))
    headerModel = HeaderModel()
    navigation_handler(headerModel, request_data)
    headerModel.generate_table_header()

    tableModel = TableModel(headerModel)
    tableModel.set_name_list_group(request_data["data"])
    tableModel.generate_table_body()

    table = {"header": headerModel.table_header, "body": tableModel.table_body}
    new_table = render_template("table.html", title="Main Table", table=table, url_root=request.url_root)
    return make_response(jsonify({"new_table": new_table}), 200)



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