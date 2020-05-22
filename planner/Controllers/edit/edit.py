from typing import List
from flask import Blueprint, render_template, request, json, jsonify, make_response, session
from planner.Models.HeaderModel import HeaderModel
from planner.Models.EditModel import EditModel
from planner.authentication import login_required

from planner.Models.DataModels.Project import Project
from planner.Models.HeaderModel import HeaderModel
from planner.Models.DataModels.DateRange import DateRange
from planner.Models.EditModel import EditModel
from planner.Sql.ProjectTables.ProjetDetails import ProjectTable, OpportunityTable
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
def edit_show_project_list():
    projects: List[Project] = []
    opportunities: List[Project] = []
    projectTable = ProjectTable()
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


@edit.route('/edit/navigation_request_handler/<string:user_id>', methods=["POST"])
def edit_navigation(user_id):
    receive_data = json.loads(str(request.get_data().decode('utf-8')))
    headerModel = HeaderModel()
    navigation_handler(headerModel, receive_data)
    headerModel.generate_table_header()
    editModel = EditModel(headerModel, user_id)
    editModel.generate_edit_body()
    table = {"header": headerModel.table_header, "body": editModel.edit_table}
    new_table = render_template("edit.html", title="Edit Page", table=table, user_id=user_id)
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