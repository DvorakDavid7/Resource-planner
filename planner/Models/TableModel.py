from typing import Dict, List
from planner.Models.Model import Model
from planner.Models.HeaderModel import HeaderModel
from planner.Models.DataModels.Worker import Worker
from planner.Sql.WorkerTables.WorkerSummaryTable import WorkerSummaryTable
from planner.Sql.DepartmentTable import DepartmentTable



class TableModel(Model):
    def __init__(self, tableHeader: HeaderModel) -> None:
        super().__init__()
        self.header = tableHeader
        self.workerList: List[Worker] = []
        self.values: Dict[str, Dict[str, str]] = {}


    def set_values(self) -> None:
        workerSummaryPlan = WorkerSummaryTable()
        plan: Dict[str, str] = {}
        for week in self.header.weeks:
            plan[str(int(week))] = ""
        for worker in self.workerList:
            workerSummaryPlan.get_worker_summary_plan(worker.id, self.header.dateRange)
            for index, week in enumerate(workerSummaryPlan.weeks):
                plan[week] = workerSummaryPlan.planned[index]
            self.values[worker.id] = plan.copy()

    def set_workerList(self, department: str) -> None:
        departmentTable = DepartmentTable()
        departmentTable.get_workers_names(department)
        for i, workerId in enumerate(departmentTable.workerId):
            worker = Worker(workerId, departmentTable.fullName[i], departmentTable.department[i])
            self.workerList.append(worker)

    def toDict(self) -> Dict:
        return {
            "workerList": [worker.__dict__ for worker in self.workerList],
            "values": self.values
        }
