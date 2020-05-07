from planner.Models.Model import Model
from planner.Sql.SqlRead import SqlRead

class FinanceModel(Model):
    def __init__(self):
        super().__init__()

        self.id: int
        self.name: str
        self.CID: str
        self.projectManager: str
        self.deliveryManager: str
        self.mdRate: int
        self.phases: list = []
        self.workers: list = []
        self.workers_id: list = []
        self.phases_id: list = []
        self.values: list = []

        self.response: dict = {
            "values": self.values,
            "workers": self.workers,
            "workers_ids": self.workers_id,
            "phases": self.phases,
            "phases_ids": self.phases_id,
        }
    
    def makeFinanceModel(self, projectId: str):
        sql = SqlRead()
        phases = sql.read_phases(projectId)
        for phase in phases:
            self.phases_id.append(phase[1])
            self.phases.append(phase[2])
        workers = sql.read_project_worker_list(projectId)
        for worker in workers:
            worker_name = worker[2] + ' (' + worker[4] + ')' if worker[2] != None else worker[1]
            self.workers_id.append(worker[1])
            self.workers.append(worker_name)
        for phase_id in self.phases_id:
            row = []
            for worker_id in self.workers_id:
                planned_hours = sql.read_planHod_worker_phase(worker_id, str(phase_id))
                row.append(planned_hours if planned_hours != None else "")
            self.values.append(row)
