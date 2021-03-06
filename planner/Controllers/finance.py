from flask import Blueprint, request, json, jsonify, make_response, session
from flask.templating import render_template
from flask.wrappers import Response
from planner.Models.FinanceModel import FinanceModel
from planner.authentication import login_required
from planner.Sql.WorkerTables.WorkerFtfp import WorkerFtfpTable
from planner.Sql.ProjectTables.ProjectTable import ProjectTable
from planner.Sql.WorkerTables.WorkerPlanTable import WorkerPlanTable
from planner.Sql.PhasePlanftft import PhasePlanftft


finance = Blueprint("finance", __name__)


@finance.route('/finance', methods=["GET"])
@login_required
def finance_get():
    try:
        department = session["user"]["department"]
    except KeyError:
        department = "IA"
    if department != "IA":
        return "<h3>you do not have permission to visit this page</h3>"
    else:
        return render_template("finance.html")


@finance.route('/finance/edit/<string:project_id>/', methods=["GET"])
def finance_edit(project_id):
    return render_template("financeEdit.html")


@finance.route('/finance/projects', methods=["GET"])
@login_required
def finance_projects():
    projectTable = ProjectTable()
    projectTable.get_projectList()
    projectList = []
    for i in range(len(projectTable.projectID)):
        record = {
            "projectID": projectTable.projectID[i],
            "cid": projectTable.cid[i],
            "fullName": projectTable.fullName[i],
            "projectManager": projectTable.projectManager[i],
            "deliveryManager": projectTable.deliveryManager[i],
            "amountTotal": projectTable.amountTotal[i],
            "estimate": projectTable.estimate[i]
        }
        projectList.append(record)
    return make_response(jsonify(projectList), 200)


@finance.route('/finance/projects/info/<string:project_id>', methods=["GET"])
@login_required
def finance_project_info(project_id):
    projectTable = ProjectTable()
    workerPlanTable = WorkerPlanTable()
    projectTable.get_projectInfo(project_id)
    record = {}
    try:
        resourcePlannerSum = workerPlanTable.get_sumOnProject(projectTable.cid[0])

        record = {
            "projectID": projectTable.projectID[0],
            "cid": projectTable.cid[0],
            "fullName": projectTable.fullName[0],
            "projectManager": projectTable.projectManager[0],
            "deliveryManager": projectTable.deliveryManager[0],
            "amountTotal": projectTable.amountTotal[0],
            "estimate": projectTable.estimate[0],
            "resourcePlannerSum": resourcePlannerSum
        }
    except IndexError:
        resourcePlannerSum = ""
        record = {}
    return make_response(jsonify(record), 200)


@finance.route('/finance/projects/sum/<string:project_id>', methods=["GET"])
@login_required
def finance_planned_hours_sum(project_id):
    workerFtfpTable = WorkerFtfpTable()
    plannedHoursSum = workerFtfpTable.get_plannedHoursSum(project_id)
    data = {
        "sum": plannedHoursSum
    }
    return make_response(jsonify(data), 200)


@finance.route('/finance/data/<string:project_id>/', methods=["GET"])
@login_required
def finance_table_data(project_id):
    financeModel = FinanceModel()
    financeModel.makeFinanceModel(project_id)
    return make_response(jsonify(financeModel.toDict()), 200)


@finance.route('/finance/save_changes', methods=["POST"])
def finance_save_changes():
    workerFtfpTable = WorkerFtfpTable()
    receive_data = json.loads(str(request.get_data().decode('utf-8')))
    modified_by = session["user"]['preferred_username']
    for change in receive_data:
        planned = change["planned"]
        phaseId = change["phaseId"]
        projectId = change["projectId"]
        workerId = change["workerId"]

        try:
            workerFtfpTable.delete_row(workerId, projectId, phaseId)
            if planned != "":
                workerFtfpTable.insert_row(workerId, projectId, phaseId, planned, modified_by)
        except Exception:
            return make_response(jsonify({"err": "saving error"}), 400)        
    return make_response(jsonify({}), 200)


@finance.route('/finance/initial_planning/save_changes', methods=["POST"])
def finance_initial_planning_save_changes():
    phasePlanftft = PhasePlanftft()
    receive_data = json.loads(str(request.get_data().decode('utf-8')))
    print(receive_data)
    modified_by = session["user"]['preferred_username']
    for change in receive_data:
        amount = change["amount"]
        phaseId = change["phaseId"]
        projectId = change["projectId"]
        cid = change["cid"]
        try:
            phasePlanftft.deleteRow(cid, projectId, phaseId)
            if amount != "":
                phasePlanftft.insertRow(cid, projectId, phaseId, amount, modified_by)
        except Exception:
            return make_response(jsonify({"err": "saving error"}), 400)

    return make_response(jsonify({}), 200)


@finance.route('/finance/initial_planning/get_values/<string:project_id>', methods=["GET"])
@login_required
def finance_initial_planning_get_values(project_id):
    phasePlanftft = PhasePlanftft()
    phasePlanftft.get_values(project_id)
    result = {}
    for i in range(len(phasePlanftft.phaseId)):
        result[phasePlanftft.phaseId[i]] = phasePlanftft.amount[i]
    return make_response(jsonify(result), 200)