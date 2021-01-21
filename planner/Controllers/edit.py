from typing import List
from flask import Blueprint, render_template, request, json, jsonify, make_response, session, current_app
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
from planner.Sql.DepartmentTable import DepartmentTable

edit = Blueprint("edit", __name__, template_folder="templates")


@edit.route('/edit/<string:user_id>', methods=["GET"])
@login_required
def edit_get(user_id):
    date_range = DateRange(**request.args)  # date_range = DateRange("2019", "2019", "30", "52")
    header = HeaderModel()
    header.set_dateRange(date_range)
    header.set_fromDatabese()

    table = EditModel(header, user_id)
    table.set_projectDetails()

    department_table = DepartmentTable()
    department_table.get_user_details(user_id)
    worker_full_name = {
        "fullName": department_table.fullName[0],
        "department": department_table.department[0]
    }
    return render_template("edit.html", body=table.toDict(), header=header.toDict(),
                           worker_info=worker_full_name, env=current_app.config["ENV"])


@edit.route('/edit/project_list', methods=["GET"])
@login_required
def edit_show_project_list():
    projects: List[Project] = []
    opportunities: List[Project] = []
    project_table = ProjectTableCRM()
    opportunity_table = OpportunityTable()
    project_table.get_project_list()
    for i, cid in enumerate(project_table.cid):
        project = Project(cid, project_table.projectFullName[i], project_table.pmFullName[i], project_table.status[i])
        projects.append(project)
    opportunity_table.get_opportunity_list()
    for i, cid in enumerate(opportunity_table.cid):
        project = Project(cid, opportunity_table.opportunityFullName[i],
                          opportunity_table.pmFullName[i], opportunity_table.status[i])
        opportunities.append(project)
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
