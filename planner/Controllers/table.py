from flask.wrappers import Response
from planner.Models.DataModels.Worker import Worker
from planner.Models.DataModels.DateRange import DateRange
from flask import Blueprint, render_template, request, json, jsonify, make_response, session, current_app
from planner.Models.HeaderModel import HeaderModel
from planner.Models.TableModel import TableModel
from planner.authentication import login_required


table = Blueprint("table", __name__, template_folder="templates")


@table.route('/table', methods=["GET", "POST"])
@login_required
def table_get() -> str:
    if request.method == "POST":
        header = json.loads(request.form.get("header"))
        values = json.loads(request.form.get("values"))
        workerList = json.loads(request.form.get("list"))
        tableModel = {
            "workerList": json.loads(workerList),
            "values": json.loads(values)
        }
        return render_template("table.html", header=json.loads(header), tableModel=tableModel)

    date_range = DateRange("", "", "", "")
    date_range.set_basedOnWeekNumber(date_range.currentWeek, date_range.currentYear)

    header = HeaderModel()
    header.set_dateRange(date_range)
    header.set_fromDatabese()

    tableModel = TableModel(header)
    try:
        tableModel.set_departmentWorkerList(session["user"]["department"])
    except KeyError:
        tableModel.set_departmentWorkerList("IA")
    tableModel.set_values()

    return render_template("table.html", header=header.toDict(),
                           tableModel=tableModel.toDict(), env=current_app.config["ENV"])


@table.route('/table/set_department', methods=["POST"])
def table_set_department() -> Response:
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


@table.route('/table/set_group', methods=["POST"])
def table_set_group() -> Response:
    request_data = json.loads(str(request.get_data().decode('utf-8')))
    groupId = request_data
    
    date_range = DateRange("", "", "", "")
    date_range.set_basedOnWeekNumber(date_range.currentWeek, date_range.currentYear)

    header = HeaderModel()
    header.set_dateRange(date_range)
    header.set_fromDatabese()

    tableModel = TableModel(header)
    with open("data/groups.txt", "r", encoding='utf8') as file:
        data = json.load(file)
    for record in data[groupId]:
        tableModel.workerList.append(Worker(record[0], record[2], record[1]))
    tableModel.set_values()

    result = {
        "tableModel": tableModel.toDict(),
        "header": header.toDict()
    }
    return make_response(jsonify(result), 200)


@table.route('/table/navigation/set_range', methods=["POST"])
def table_navigation_range() -> Response:
    request_data = json.loads(str(request.get_data().decode('utf-8')))
    try:
        date_range = DateRange(**request_data["dateRange"])
        header = HeaderModel()
        header.set_dateRange(date_range)
        header.set_fromDatabese()

        tableModel = TableModel(header)
        for record in request_data["list"]:
            tableModel.workerList.append(Worker(**record)) 
        tableModel.set_values()    
        result = {
            "tableModel": tableModel.toDict(),
            "header": header.toDict()
        }
        return make_response(jsonify(result), 200)
    except Exception:
        return make_response(jsonify({"err": "Server got bad data"}), 400)


@table.route('/table/navigation/set_week', methods=["POST"])
def table_navigation_week() -> Response:
    request_data = json.loads(str(request.get_data().decode('utf-8')))
    date_range = DateRange("", "", "", "")
    try:
        date_range.set_basedOnWeekNumber(**request_data["date"])
        
        header = HeaderModel()
        header.set_dateRange(date_range)
        header.set_fromDatabese()

        tableModel = TableModel(header)
        for record in request_data["list"]:
            tableModel.workerList.append(Worker(**record)) 
        tableModel.set_values()    
        result = {
            "tableModel": tableModel.toDict(),
            "header": header.toDict()
        }
        return make_response(jsonify(result), 200)
    except Exception:
        return make_response(jsonify({"err": "Server got bad data"}), 400)


@table.route('/table/deepsearch', methods=["POST"])
def table_deepSearch() -> Response:
    request_data = json.loads(str(request.get_data().decode('utf-8')))

    date_range = DateRange(**request_data["header"]["dateRange"])

    header = HeaderModel()
    header.set_dateRange(date_range)
    header.weeks = request_data["header"]["weeks"]
    header.dates = request_data["header"]["dates"]
    header.workingHours = request_data["header"]["workingHours"]

    tableModel = TableModel(header)
    tableModel.set_seepSearchWorkerList(request_data["search"])
    tableModel.set_values()

    result = {
        "tableModel": tableModel.toDict(),
        "header": header.toDict()
    }
    return make_response(jsonify(result), 200)