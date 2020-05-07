from flask import render_template, make_response, jsonify, request, json, send_file
from planner.Controllers.Controller import Controller
from planner.Models.HeaderModel import HeaderModel
from planner.Models.TableModel import TableModel
from planner.Models.ProjectsListModel import ProjectListModel
from planner.Models.FinanceModel import FinanceModel
from planner.Sql.SqlWrite import SqlWrite

class FinanceController(Controller):
    def __init__(self):
        super().__init__()

    # GET
    @staticmethod
    def index():
        return send_file("../planner/templates/finance.html")

    # GET
    @staticmethod
    def project_list():
        projectListModel = ProjectListModel()
        projectListModel.generate_project_list()
        return make_response(jsonify({"data": projectListModel.project_list["projects"]}), 200)
    
    # GET
    @staticmethod
    def finance_table(project_id):
        financeModel = FinanceModel()
        financeModel.makeFinanceModel(project_id)
        print(financeModel.response)
        return make_response(jsonify(financeModel.response), 200)

    # POST
    @staticmethod
    def save_changes(changes, modified_by):
        sql = SqlWrite()
        try:
            for change in changes:
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
