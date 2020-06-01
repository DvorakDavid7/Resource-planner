from typing import List
from flask import Blueprint, render_template, request, json, jsonify, make_response, session
from planner.Models.HeaderModel import HeaderModel
from planner.Models.ProjectEditModel import ProjectEditModel
from planner.Models.DataModels.DateRange import DateRange
from planner.Sql.DepartmentTable import DepartmentTable
from planner.Models.DataModels.Worker import Worker
from planner.Sql.WorkerTables.WorkerPlanTable import WorkerPlanTable
from planner.authentication import login_required


alocation = Blueprint("alocation", __name__)


@alocation.route('/project_edit/<string:cid>', methods=["GET"])
@login_required
def project_edit(cid):
    if request.args:
        dateRange = DateRange(**request.args)
    else:
        dateRange = DateRange("", "", "", "")
        dateRange.set_basedOnWeekNumber(dateRange.currentWeek, dateRange.currentYear)

    headerModel = HeaderModel()
    headerModel.set_dateRange(dateRange)
    headerModel.set_fromDatabese()
    
    projectEditModel = ProjectEditModel(headerModel, cid)
    projectEditModel.set_values()

    return render_template("ProjectEdit.html", header=headerModel.toDict(), model=projectEditModel.toDict())


@alocation.route('/project_edit/get_names', methods=["GET"])
@login_required
def project_edit_get_names():
    workerList : List[Worker] = []
    departmentTable = DepartmentTable()
    departmentTable.get_workers_names("IA")
    for i, workerId in enumerate(departmentTable.workerId):
        worker = Worker(workerId, departmentTable.fullName[i], departmentTable.department[i])
        workerList.append(worker)
    nameList = {"workers": [worker.__dict__ for worker in workerList]}
    return make_response(jsonify(nameList), 200)


@alocation.route('/project_edit/save_changes', methods=["POST"])
def project_edit_save_changes():
    receive_data = json.loads(str(request.get_data().decode('utf-8')))
    table = WorkerPlanTable()
    try:
        for change in receive_data:
            value = change["value"]
            del change["value"]
            change["typeZpid"] = "1"
            table.delete_row(**change)
            if value != "":
                change["plannedHours"] = value
                change["modifiedBy"] = session["user"]['preferred_username']
                table.insert_row(**change)
    except Exception as err:
        return make_response(jsonify({"err": err}), 400)
    return make_response(jsonify({}), 200)

   

@alocation.route('/project_edit/add_worker', methods=["POST"])
def project_edit_add_worker():
    receive_data = json.loads(str(request.get_data().decode('utf-8')))
    table = WorkerPlanTable()
    try:
        receive_data["modifiedBy"] = session["user"]['preferred_username']
        receive_data["typeZpid"] = "1"
        table.insert_row(**receive_data)
    except Exception as err:
        return make_response(jsonify({"err": err}), 400)
    return make_response(jsonify({}), 200)
