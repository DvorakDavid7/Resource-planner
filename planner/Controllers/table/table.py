from planner.Models.DataModels.Worker import Worker
from planner.Models.DataModels.DateRange import DateRange
from flask import Blueprint, render_template, request, json, jsonify, make_response, session
from planner.Models.HeaderModel import HeaderModel
from planner.Models.TableModel import TableModel
from planner.authentication import login_required


table = Blueprint("table", __name__, template_folder="templates")

@table.route('/table', methods=["GET"])
@login_required
def table_get():
    date_range = DateRange("", "", "", "")
    date_range.set_basedOnWeekNumber(date_range.currentWeek, date_range.currentYear)

    header = HeaderModel()
    header.set_dateRange(date_range)
    header.set_fromDatabese()

    tableModel = TableModel(header)
    tableModel.set_departmentWorkerList(session["user"]["department"])
    tableModel.set_values()    

    return render_template("table.html", header=header.toDict(), tableModel=tableModel.toDict())


@table.route('/table/set_department', methods=["POST"])
def table_set_department():
    request_data = json.loads(str(request.get_data().decode('utf-8')))
    department = request_data["department"]

    date_range = DateRange(**request_data["header"]["dateRange"])

    header = HeaderModel()
    header.set_dateRange(date_range)
    header.weeks = request_data["header"]["weeks"]
    header.dates = request_data["header"]["dates"]
    header.workingHours = request_data["header"]["workingHours"]

    tableModel = TableModel(header)
    department_formated = str(tuple(department.split())) if len(department) != 2 else department
    tableModel.set_departmentWorkerList(department_formated)
    tableModel.set_values()
    result = {
        "tableModel": tableModel.toDict(),
        "header": header.toDict()
    }
    return make_response(jsonify(result), 200)


@table.route('/table/navigation/set_range', methods=["POST"])
def table_navigation_range():
    request_data = json.loads(str(request.get_data().decode('utf-8')))
    date_range = DateRange(**request_data["dateRange"])
    header = HeaderModel()
    header.set_dateRange(date_range)
    header.set_fromDatabese()

    tableModel = TableModel(header)
    for record in request_data["nameList"]:
        tableModel.workerList.append(Worker(**record)) 
    tableModel.set_values()    
    result = {
        "tableModel": tableModel.toDict(),
        "header": header.toDict()
    }
    return make_response(jsonify(result), 200)


@table.route('/table/navigation/set_week', methods=["POST"])
def table_navigation_week():
    request_data = json.loads(str(request.get_data().decode('utf-8')))
    date_range = DateRange("", "", "", "")
    date_range.set_basedOnWeekNumber(**request_data["date"])
    
    header = HeaderModel()
    header.set_dateRange(date_range)
    header.set_fromDatabese()

    tableModel = TableModel(header)
    for record in request_data["nameList"]:
        tableModel.workerList.append(Worker(**record)) 
    tableModel.set_values()    
    result = {
        "tableModel": tableModel.toDict(),
        "header": header.toDict()
    }
    return make_response(jsonify(result), 200)
