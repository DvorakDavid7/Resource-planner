from planner.Models.DataModels.Project import Project
from typing import List, Dict
from planner.Models.HeaderModel import HeaderModel
from planner.Models.Model import Model
from planner.Sql.ProjectTables.ProjectSummaryTable import ProjectSummaryTable
from planner.Sql.ProjectTables.ProjetDetails import ProjectTable
from planner.Sql.ProjectTables.ProjectSummaryTable import ProjectSummaryTable

class ProjectTableModel(Model):
    def __init__(self, tableHeader: HeaderModel):
        super().__init__()
        self.tableHeader = tableHeader
        self.projectList: List[Project] = []
        self.values: Dict = {}


    def set_values(self) -> None:
        plan: Dict = {}
        
        for week in self.tableHeader.weeks:
            plan[str(int(week))] = ""

        for project in self.projectList:
            projectSummaryTable = ProjectSummaryTable()
            self.values[project.cid] = plan.copy()
            projectSummaryTable.get_project_summary_plan(project.cid, self.tableHeader.dateRange)
            for index, week in enumerate(projectSummaryTable.week):
                self.values[project.cid][week] = str(projectSummaryTable.planned[index])

    def set_projectList(self) -> None:
        projectTable = ProjectTable()
        projectTable.get_project_list()
        for i, cid in enumerate(projectTable.cid):
            self.projectList.append(Project(cid, projectTable.projectFullName[i], projectTable.pmFullName[i]))


    def toDict(self) -> Dict:
        return {
            "projectList": [project.__dict__ for project in self.projectList],
            "values": self.values
        }
