from typing import Dict, List
from planner.Models.Model import Model
from planner.Sql.ProjectTables.ProjectWorkersTable import ProjectWorkersTable 
from planner.Sql.ProjectTables.ProjectPhasesTable import ProjecPhasesTable
from planner.Sql.WorkerTables.WorkerFtfp import WorkerFtfpTable
from planner.Models.DataModels.Worker import Worker
from planner.Sql.DepartmentTable import DepartmentTable

class FinanceModel(Model):
    def __init__(self):
        super().__init__()
        self.values: Dict = {}
        self.phaseList: List = []
        self.workerList: List = []


    def makeFinanceModel(self, projectId: str):
        plan = {}

        # workers from achievo
        projectWorkersTable = ProjectWorkersTable()
        
        # list of phases
        projecPhasesTable = ProjecPhasesTable()
        
        # already saved workers
        workerFtfpTable = WorkerFtfpTable()

        # aditional information
        departmentTable = DepartmentTable()
        
        projectWorkersTable.get_project_workers(projectId) # achievo workers
        workerFtfpTable.get_workersOnProject(projectId) # saved wokers
        projecPhasesTable.get_phases(projectId)

        # initial worker ids set
        workerListSet: set[str] = set()
        for workerId in projectWorkersTable.workerId:
            workerListSet.add(workerId)

        for workerId in workerFtfpTable.workerId:
            workerListSet.add(workerId)

        projectWorkersTable.clearTable()
        for workerId in workerListSet:
            # get worker informations   
            isWorkerActive = True
            try:
                projectWorkersTable.get_userDetailsOnProject(workerId, projectId)
                workerRole = projectWorkersTable.roleName[0]
            except IndexError:
                workerRole = ""
            finally:
                projectWorkersTable.clearTable()

            try:
                departmentTable.get_user_details(workerId)
                workerFullName = departmentTable.fullName[0]
            except IndexError:
                # worker is no longer in Trask
                workerFullName = workerId
                isWorkerActive = False
            finally:
                departmentTable.clearTable()

            worker = Worker(workerId, workerFullName, "", workerRole, isWorkerActive)
            self.workerList.append(worker.__dict__)
        
        # initial plan
        for phaseId in projecPhasesTable.phaseId:
            plan[phaseId] = ""

        for worker in self.workerList:
            workerId = worker["id"]
            self.values[workerId] = plan.copy()
            for phaseId in projecPhasesTable.phaseId:
                workerFtfpTable.get_planned_hours(workerId, phaseId)   
                self.values[workerId][phaseId] = workerFtfpTable.planned[0]
                workerFtfpTable.clearTable()
            

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
