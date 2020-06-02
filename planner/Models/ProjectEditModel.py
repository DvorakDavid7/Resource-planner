from planner.Models.HeaderModel import HeaderModel
from planner.Sql.SqlRead import SqlRead
from typing import Dict, List
from planner.Models.Model import Model
from copy import deepcopy
from planner.Sql.WorkerTables.WorkerPlanTable import WorkerPlanTable
from planner.Sql.DepartmentTable import DepartmentTable
from planner.Models.DataModels.Worker import Worker
from planner.Sql.ProjectTables.ProjectWorkersAchievo import ProjectWorkersAchievo


class ProjectEditModel(Model):
    def __init__(self, tableHeader: HeaderModel, cid: str):
        super().__init__()
        self.header = tableHeader
        self.nameList: List[Worker] = []
        self.values: Dict = {}
        self.cid = cid

    def projectPlan(self) -> Dict:
        plan: Dict = {}
        result = {}
        workerPlanTable = WorkerPlanTable()
        for week in self.header.weeks:
            plan[str(int(week))] = {
                "planned": "",
                "alocated": ""
            }
        workerPlanTable.get_workers_on_project(self.cid, self.header.dateRange)
        for i, week in enumerate(workerPlanTable.week):
            current_value = ""
            if workerPlanTable.workerId[i] in result.keys():
                current_value = result[workerPlanTable.workerId[i]][week]["planned"]
            else:
                result[workerPlanTable.workerId[i]] = deepcopy(plan)
            if current_value:
                result[workerPlanTable.workerId[i]][week]["planned"] = str(int(workerPlanTable.planned[i]) + int(current_value))
            else:
                result[workerPlanTable.workerId[i]][week]["planned"] = str(workerPlanTable.planned[i])
            year = self._current_year(int(week))
            alocation = workerPlanTable.get_worker_alocation(workerPlanTable.workerId[i], year, week)
            result[workerPlanTable.workerId[i]][week]["alocated"] = alocation
        return result

    def set_values(self):
        self.values = self.projectPlan()
        departmentTable = DepartmentTable()
        for workerId in self.values.keys():
            departmentTable.get_user_details(workerId)
            try:
                worker = Worker(workerId, departmentTable.fullName[0], departmentTable.department[0])
            except IndexError:
                worker = Worker(workerId, workerId, "NULL!!!")
            self.nameList.append(worker)
            departmentTable.clearTable()
    
    def add_achievoWorkers(self):
        achievoWorkerList = []
        plan: Dict = {}
        projectWorkersAchievo = ProjectWorkersAchievo()
        projectWorkersAchievo.get_project_workers(self.cid)
        for week in self.header.weeks:
            plan[str(int(week))] = {
                "planned": "",
                "alocated": ""
            }

        for i, workerId in enumerate(projectWorkersAchievo.workerId):
            fullName = projectWorkersAchievo.workerFullName[i] if projectWorkersAchievo.workerFullName[i] != None else workerId
            achievoWorkerList.append(Worker(workerId, fullName, "ACH"))

        for worker in achievoWorkerList:
            if not self.values.get(worker.id):
                self.nameList.append(worker)
                self.values[worker.id] = deepcopy(plan)

    def _current_year(self, week: int):     
        if week < int(self.header.dateRange.week_start):
            return str(int(self.header.dateRange.year_start) + 1)
        else:
            return self.header.dateRange.year_start


    def toDict(self) -> Dict:
        return {
            "nameList": [worker.__dict__ for worker in self.nameList],
            "values": self.values
        }
