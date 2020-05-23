from flask import Blueprint, render_template, request, json, jsonify, make_response, send_file
from planner.Models.ProjectsListModel import ProjectListModel
from planner.Models.FinanceModel import FinanceModel
from planner.authentication import login_required


finance = Blueprint("finance", __name__, template_folder="templates")

@finance.route('/finance', methods=["GET"])
@login_required
def finance_get():
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
    modified_by = "ddvorak@trask.cz" # session["user"]['preferred_username']
    sql = SqlWrite()
    try:
        for change in receive_data:
            print(change)
            if change["new_value"] == "":
                sql.delete_row_ftfp(str(change['worker_id']), int(change['project_id']), int(change['phase_id']))
            else:
                sql.delete_row_ftfp(str(change['worker_id']), int(change['project_id']), int(change['phase_id']))
                sql.insert_row_ftfp(str(change['worker_id']), int(change['project_id']), int(change['phase_id']), int(change['new_value']), modified_by)
        print("OK")
        return make_response(jsonify({}), 200)
    except Exception as err:
        print(err)
        return make_response(jsonify({"error": err}), 400)