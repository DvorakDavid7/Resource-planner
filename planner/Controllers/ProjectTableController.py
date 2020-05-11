from planner.Models.ProjectTableModel import ProjectTableModel
from flask import render_template, make_response, jsonify, request, json
from planner.Controllers.Controller import Controller
from planner.Models.HeaderModel import HeaderModel
from planner.Models.TableModel import TableModel


class ProjectTableController(Controller):
    def __init__(self):
        super().__init__()

    # GET
    @staticmethod
    def index():
        headerModel = HeaderModel()
        headerModel.set_default_dates()
        headerModel.generate_table_header()

        projectTableModel = ProjectTableModel(headerModel)
        projectTableModel.set_project_list()
        data = projectTableModel.generate_table_body()
        table = {"header": headerModel.table_header}
    
        return render_template("NavLayout/ProjectsOverview.html", table=table, projectList=projectTableModel.project_list, data=data)

    # POST
    @staticmethod
    def test():
        content = jsonify({"data": render_template("components/projectsTable.html", name="thi is new table")})
        return make_response(content)
