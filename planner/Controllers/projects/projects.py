from planner.Models.HeaderModel import HeaderModel
from planner.Models.ProjectTableModel import ProjectTableModel
from planner.authentication import login_required
from planner.Models.DataModels.DateRange import DateRange
from flask import Blueprint, render_template, request, json, jsonify, make_response, session
from planner.Models.DataModels.Project import Project


projects = Blueprint("projects", __name__)


@projects.route('/projects', methods=["GET"])
@login_required
def projects_get():
    dateRange = DateRange("", "", "", "")
    dateRange.set_basedOnWeekNumber(dateRange.currentWeek, dateRange.currentYear)

    headerModel = HeaderModel()
    headerModel.set_dateRange(dateRange)
    headerModel.set_fromDatabese()

    projectTableModel = ProjectTableModel(headerModel)
    projectTableModel.set_projectList()
    projectTableModel.set_values()
    return render_template("ProjectsOverview.html", projectTableModel=projectTableModel.toDict(), header=headerModel.toDict())



@projects.route('/projects/navigation/set_range', methods=["POST"])
def projects_navigation_range():
    request_data = json.loads(str(request.get_data().decode('utf-8')))
    try:
        date_range = DateRange(**request_data["dateRange"])

        headerModel = HeaderModel()
        headerModel.set_dateRange(date_range)
        headerModel.set_fromDatabese()

        projectTableModel = ProjectTableModel(headerModel)
        for record in request_data["list"]:
            projectTableModel.projectList.append(Project(record["cid"], record["fullName"], record["projectManager"]))
        projectTableModel.set_values()

        result = {
            "tableModel": projectTableModel.toDict(),
            "header": headerModel.toDict()
        }
        return make_response(jsonify(result), 200)
    except Exception:
        return make_response(jsonify({"err": "Server got bad data"}), 400)


@projects.route('/projects/navigation/set_week', methods=["POST"])
def projects_navigation_week():
    request_data = json.loads(str(request.get_data().decode('utf-8')))
    date_range = DateRange("", "", "", "")
    try:
        date_range.set_basedOnWeekNumber(**request_data["date"])
        
        header = HeaderModel()
        header.set_dateRange(date_range)
        header.set_fromDatabese()

        projectTableModel = ProjectTableModel(header)
        for record in request_data["list"]:
            projectTableModel.projectList.append(Project(**record)) 
        projectTableModel.set_values()    
        result = {
            "tableModel": projectTableModel.toDict(),
            "header": header.toDict()
        }
        return make_response(jsonify(result), 200)
    except Exception:
        return make_response(jsonify({"err": "Server got bad data"}), 400)
