from planner.Models.HeaderModel import HeaderModel
from typing import Dict, List
from planner.Models.Model import Model
from planner.Models.DataModels.Project import Project
from planner.Sql.WorkerTables.WorkerPlanTable import WorkerPlanTable
from planner.Sql.ProjectTables.ProjectTableCRM import ProjectTableCRM
from planner.Sql.ProjectTables.OpportunityTable import OpportunityTable


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
        worker_plan_table = WorkerPlanTable()
        plan: Dict[str, str] = {}
        result = {}
        worker_plan_table.get_worker_plan(self.workerId, typeZPID, self.header.dateRange)
        for week in self.header.weeks:
            plan[str(int(week))] = ""
        for i, week in enumerate(worker_plan_table.week):
            current_value = ""
            if worker_plan_table.cid[i] in result.keys():
                current_value = result[worker_plan_table.cid[i]][week]
            else:
                result[worker_plan_table.cid[i]] = plan.copy()
            if current_value:
                result[worker_plan_table.cid[i]][week] = str(int(worker_plan_table.planned[i]) + int(current_value))
            else:
                result[worker_plan_table.cid[i]][week] = str(worker_plan_table.planned[i])
        return result
        
    def set_projectDetails(self) -> None:
        self.projectValues = self.workerPlan("1")
        self.opportunityValues = self.workerPlan("0")
        table_of_projects = ProjectTableCRM()
        table_of_opportunities = OpportunityTable()
        
        for cid in self.projectValues.keys():
            table_of_projects.get_project_details(cid)
            if table_of_projects.projectFullName:
                try:
                    project = Project(cid, table_of_projects.projectFullName[0],
                                      table_of_projects.pmFullName[0], table_of_projects.status[0])
                except IndexError:
                    project = Project(cid, cid, "NULL!!!")
                self.projectList.append(project)
            table_of_projects.clearTable()

        for cid in self.opportunityValues.keys():
            table_of_opportunities.get_opportunity_details(cid)
            if table_of_opportunities.opportunityFullName:
                try:
                    opportunity = Project(cid, table_of_opportunities.opportunityFullName[0],
                                          table_of_opportunities.pmFullName[0], table_of_opportunities.status[0])
                except IndexError:
                    opportunity = Project(cid, cid, "NULL!!!")
                self.opportunityList.append(opportunity)
            table_of_opportunities.clearTable()

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
