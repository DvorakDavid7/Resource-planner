from planner.Sql.SqlRead import SqlRead
from typing import List, Dict
from planner.Models.HeaderModel import HeaderModel
from planner.Models.Model import Model
from planner.Models.ProjectsListModel import ProjectListModel


class ProjectTableModel(Model):
    def __init__(self, tableHeader: HeaderModel):
        super().__init__()
        self.tableHeader = tableHeader
        self.project_list = []
        self.table_body: List[List] = []


    def generate_table_body(self) -> Dict:
        sql = SqlRead()

        plan: Dict[int, str] = {}
        result = {}

        for week in self.tableHeader.table_header["weeks"]:
            plan[int(week)] = ""

        for project in self.project_list:
            project_id = str(project[0])
            result[project_id] = plan.copy()
            summary = sql.read_project_summary_plan(project_id, "2020", "17", "2020", "37")
            for row in summary:
                week = int(row[1])
                value = str(row[2])
                result[project_id][week] = value
        return result


    def set_project_list(self) -> None:
        projectListModel = ProjectListModel()
        self.project_list = projectListModel.generate_projects()
