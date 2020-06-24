from typing import Dict, List
from planner.Models.Model import Model
from planner.Sql.SqlRead import SqlRead
from planner.Sql.ProjectTables.ProjectWorkersTable import ProjectWorkersTable 
from planner.Sql.ProjectTables.ProjectPhasesTable import ProjecPhasesTable
from planner.Sql.WorkerTables.WorkerFtfp import WorkerFtfpTable
from planner.Models.DataModels.Worker import Worker

class FinanceModel(Model):
    def __init__(self):
        super().__init__()
        self.values: Dict = {}
        self.phaseList: List = []
        self.workerList: List = []


    def makeFinanceModel(self, projectId: str):
        plan = {}
        projectWorkersTable = ProjectWorkersTable()
        projecPhasesTable = ProjecPhasesTable()
        workerFtfpTable = WorkerFtfpTable()
        
        projectWorkersTable.get_project_workers(projectId)
        projecPhasesTable.get_phases(projectId)
        
        for phaseId in projecPhasesTable.phaseId:
            plan[phaseId] = ""

        for workerId in projectWorkersTable.workerId:
            self.values[workerId] = plan.copy()
            for phaseId in projecPhasesTable.phaseId:
                workerFtfpTable.get_planned_hours(workerId, phaseId)   
                self.values[workerId][phaseId] = workerFtfpTable.planned[0]
                workerFtfpTable.clearTable()
        
        # worker List
        for i, workerId in enumerate(projectWorkersTable.workerId):
            worker = Worker(workerId, projectWorkersTable.workerFullName[i], "", projectWorkersTable.roleName[i])
            self.workerList.append(worker.__dict__)
        
        # phase List
        for i, phaseId in enumerate(projecPhasesTable.phaseId):
            phase = {
                "phaseId": phaseId,
                "phaseName": projecPhasesTable.phaseName[i]
            }
            self.phaseList.append(phase)

        self.workerList.sort(key=lambda x: x["role"], reverse=False)
        self.phaseList.sort(key=lambda x: x["phaseName"], reverse=False)
    
    
    def toDict(self):
        return {
            "values": self.values,
            "phaseList": self.phaseList,
            "workerList": self.workerList
        }
