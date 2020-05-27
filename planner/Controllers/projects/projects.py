
from flask import Blueprint, render_template
from planner.Models.HeaderModel import HeaderModel
from planner.Models.ProjectTableModel import ProjectTableModel
from planner.authentication import login_required
from planner.Models.DataModels.DateRange import DateRange


projects = Blueprint("projects", __name__)


@projects.route('/projects', methods=["GET"])
@login_required
def projects_get():
    dateRange = DateRange("2019", "2019", "30", "52")
    headerModel = HeaderModel()
    headerModel.set_dateRange(dateRange)
    headerModel.set_fromDatabese()

    projectTableModel = ProjectTableModel(headerModel)
    projectTableModel.set_projectList()
    projectTableModel.set_values()
    return render_template("ProjectsOverview.html", projectTableModel=projectTableModel.toDict(), header=headerModel.toDict())
