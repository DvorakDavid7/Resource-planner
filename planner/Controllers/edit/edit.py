from typing import List
from flask import Blueprint, render_template, request, json, jsonify, make_response, session
from planner.Models.HeaderModel import HeaderModel
from planner.Models.EditModel import EditModel
from planner.authentication import login_required

from planner.Models.DataModels.Project import Project
from planner.Models.HeaderModel import HeaderModel
from planner.Models.DataModels.DateRange import DateRange
from planner.Models.EditModel import EditModel
from planner.Sql.ProjectTables.ProjectTableCRM import ProjectTableCRM
from planner.Sql.ProjectTables.OpportunityTable import OpportunityTable
from planner.Sql.WorkerTables.WorkerPlanTable import WorkerPlanTable

edit = Blueprint("edit", __name__, template_folder="templates")


@edit.route('/edit/<string:user_id>', methods=["GET"])
@login_required
def edit_get(user_id):
    date_range = DateRange(**request.args) # date_range = DateRange("2019", "2019", "30", "52")
    header = HeaderModel()
    header.set_dateRange(date_range)
    header.set_fromDatabese()

    table = EditModel(header, user_id)
    table.set_projectDetails()
    return render_template("edit.html", body=table.toDict(), header=header.toDict())


@edit.route('/edit/project_list', methods=["GET"])
@login_required
def edit_show_project_list():
    projects: List[Project] = []
    opportunities: List[Project] = []
    projectTable = ProjectTableCRM()
    opportunityTable = OpportunityTable()
    projectTable.get_project_list()
    for i, cid in enumerate(projectTable.cid):
        projects.append(Project(cid, projectTable.projectFullName[i], projectTable.pmFullName[i]))
    opportunityTable.get_opportunity_list()
    for i, cid in enumerate(opportunityTable.cid):
        opportunities.append(Project(cid, opportunityTable.opportunityFullName[i], opportunityTable.pmFullName[i]))
    project_list = {
        "projects": [project.__dict__ for project in projects],
        "opportunities": [opportunity.__dict__ for opportunity in opportunities]
    }
    return make_response(jsonify(project_list), 200)


@edit.route('/edit/save_changes/', methods=["POST"])
def edit_save_changes():
    receive_data = json.loads(str(request.get_data().decode('utf-8')))
    table = WorkerPlanTable()
    try:
        for change in receive_data:
            value = change["value"]
            del change["value"]
            table.delete_row(**change)
            if value != "":
                change["plannedHours"] = value
                change["modifiedBy"] = session["user"]['preferred_username']
                table.insert_row(**change)
    except Exception as err:
        return make_response(jsonify({"err": err}), 400)
    return make_response(jsonify({}), 200)


@edit.route('/edit/add_new_project/', methods=["POST"])
def add_new_project():
    receive_data = json.loads(str(request.get_data().decode('utf-8')))
    table = WorkerPlanTable()
    try:
        receive_data["modifiedBy"] = session["user"]['preferred_username']
        table.insert_row(**receive_data)
    except Exception as err:
        return make_response(jsonify({"err": err}), 400)
    return make_response(jsonify({}), 200)
