from flask import Blueprint, request, json, jsonify, make_response, send_file, session
from planner.Models.ProjectsListModel import ProjectListModel
from planner.Models.FinanceModel import FinanceModel
from planner.authentication import login_required
from planner.Sql.WorkerTables.WorkerFtfp import WorkerFtfpTable


finance = Blueprint("finance", __name__, template_folder="templates")

@finance.route('/finance', methods=["GET"])
@login_required
def finance_get():
    if session["user"]["department"] != "IA":
        return "<h3>you do not have permission to visit this page</h3>"
    else:
        return send_file("Controllers/finance/templates/finance.html")

@finance.route('/finance/projects', methods=["GET"])
def finance_projects():
    projectListModel = ProjectListModel()
    projectListModel.generate_project_list()
    return make_response(jsonify({"data": projectListModel.project_list["projects"]}), 200)


@finance.route('/finance/data/<string:project_id>/', methods=["GET"])
def finance_table_data(project_id):
    financeModel = FinanceModel()
    financeModel.makeFinanceModel(project_id)
    print(financeModel.response)
    return make_response(jsonify(financeModel.response), 200)



@finance.route('/finance/save_changes', methods=["POST"])
def finance_save_changes():
    receive_data = json.loads(str(request.get_data().decode('utf-8')))
    modified_by = session["user"]['preferred_username']
    workerFtfpTable = WorkerFtfpTable()
    print(receive_data)
    try:
        for change in receive_data:
            workerFtfpTable.delete_row(change['worker_id'], change['project_id'], change['phase_id'])
            if change["new_value"] != "":
                workerFtfpTable.insert_row(change['worker_id'], change['project_id'], change['phase_id'], change['new_value'], modified_by)
        return make_response(jsonify({}), 200)
    except Exception:
        return make_response(jsonify({"error": "save error"}), 400)
