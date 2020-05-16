
from flask import Blueprint, render_template, request, json, jsonify, make_response
from planner.Models.HeaderModel import HeaderModel
from planner.Models.ProjectTableModel import ProjectTableModel
from planner.authentication import login_required

projects = Blueprint("projects", __name__, template_folder="templates", static_folder="static", static_url_path='/projects/static')


@projects.route('/projects', methods=["GET"])
@login_required
def projects_get():
    headerModel = HeaderModel()
    headerModel.set_default_dates()
    headerModel.generate_table_header()

    projectTableModel = ProjectTableModel(headerModel)
    projectTableModel.set_project_list()
    data = projectTableModel.generate_table_body()
    table = {"header": headerModel.table_header}

    return render_template("ProjectsOverview.html", table=table, projectList=projectTableModel.project_list, data=data)