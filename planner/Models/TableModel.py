from typing import Dict, List
from planner.Models.Model import Model
from planner.Models.HeaderModel import HeaderModel
from planner.Models.DataModels.Worker import Worker
from planner.Sql.WorkerTables.WorkerSummaryTable import WorkerSummaryTable
from planner.Sql.DepartmentTable import DepartmentTable



class TableModel(Model):
    def __init__(self, tableHeader: HeaderModel) -> None:
        super().__init__()
        self.workerSummaryPlan = WorkerSummaryTable()
        self.departmentTable = DepartmentTable()

        self.header = tableHeader
        self.workerList: List[Worker] = []
        self.values: Dict[str, Dict[str, str]] = {}


    def set_values(self) -> None:
        plan: Dict[str, str] = {}
        for week in self.header.weeks:
            plan[str(int(week))] = ""
        for worker in self.workerList:
            self.workerSummaryPlan.get_worker_summary_plan(worker.id, self.header.dateRange)
            for index, week in enumerate(self.workerSummaryPlan.weeks):
                plan[week] = self.workerSummaryPlan.planned[index]
            self.values[worker.id] = plan.copy()

    def set_workerList(self, department: str) -> None:
        self.departmentTable.get_workers_names(department)
        for i, workerId in enumerate(self.departmentTable.workerId):
            worker = Worker(workerId, self.departmentTable.fullName[i], self.departmentTable.department[i])
            self.workerList.append(worker)

    def toDict(self) -> Dict:
        return {
            "workerList": [worker.__dict__ for worker in self.workerList],
            "values": self.values
        }
