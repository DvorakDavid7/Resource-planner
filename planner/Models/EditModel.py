from planner.Models.HeaderModel import HeaderModel
from typing import Dict, List
from planner.Models.Model import Model
from planner.Models.DataModels.Project import Project
from planner.Sql.WorkerTables.WorkerPlanTable import WorkerPlanTable
from planner.Sql.ProjectTables.ProjetDetails import ProjectTable, OpportunityTable


class EditModel(Model):
    def __init__(self, tableHeader: HeaderModel, workerId: str) -> None:
        super().__init__()
        self.header = tableHeader
        self.workerId = workerId
        self.projectList: List[Project] = []
        self.opportunityList: List[Project] = []
        self.projectValues: Dict = {}
        self.opportunityValues: Dict = {}

    def workerPlan(self, typeZPID: str) -> Dict:
        workerPlanTable = WorkerPlanTable()
        plan: Dict[str, str] = {}
        result = {}
        workerPlanTable.get_worker_plan(self.workerId, typeZPID, self.header.dateRange)
        for week in self.header.weeks:
            plan[str(int(week))] = ""
        for i, week in enumerate(workerPlanTable.week):
            current_value = ""
            if workerPlanTable.cid[i] in result.keys():
                current_value = result[workerPlanTable.cid[i]][week]
            else:
                result[workerPlanTable.cid[i]] = plan.copy()
            if current_value:
                result[workerPlanTable.cid[i]][week] = str(int(workerPlanTable.planned[i]) + int(current_value))
            else:
                result[workerPlanTable.cid[i]][week] = str(workerPlanTable.planned[i])
        return result
        
    def set_projectDetails(self):
        self.projectValues = self.workerPlan("1")
        self.opportunityValues = self.workerPlan("0")
        for cid in self.projectValues.keys():
            tableOfProjects = ProjectTable()
            tableOfProjects.get_project_details(cid)
            if tableOfProjects.projectFullName:
                try:
                    project = Project(cid, tableOfProjects.projectFullName[0], tableOfProjects.pmFullName[0])
                except IndexError:
                    project = Project(cid, cid, "NULL!!!")
                self.projectList.append(project)
        for cid in self.opportunityValues.keys():
            tableOfOpportunities = OpportunityTable()
            tableOfOpportunities.get_opportunity_details(cid)
            if tableOfOpportunities.opportunityFullName:
                try:
                    opportunity = Project(cid, tableOfOpportunities.opportunityFullName[0], tableOfOpportunities.pmFullName[0])
                except IndexError:
                    opportunity = Project(cid, cid, "NULL!!!")
                self.opportunityList.append(opportunity)

    def toDict(self) -> Dict:
        return {
            "projects": {
                "projectList": [project.__dict__ for project in self.projectList],
                "values": self.projectValues
            },
            "opportunities": {
                "opportunityList": [opportunity.__dict__ for opportunity in self.opportunityList],
                "values": self.opportunityValues
            }
        }
