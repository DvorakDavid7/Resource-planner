from typing import List
from planner.Sql.SqlMain import SqlMain


class WorkerFtfpTable(SqlMain):
 
    DATA_RESOURCE = "[dbo].[PracovnikPlanFtfp]"
    
    def __init__(self) -> None:
        super().__init__()
        super().connect_to_database()
        self.planned: List[str] = []

    def get_planned_hours(self, workerId: str, phaseId: str) -> None:  # return planHod
        query = f'''SELECT [PlanHod] FROM {self.DATA_RESOURCE}
                WHERE PracovnikID = '{workerId}' AND FazeID = {phaseId}'''
        table = self.cursor.execute(query)
        result_list = table.fetchall()
        self.planned.append(str(result_list[0][0]) if result_list else "" )
    

    def get_plannedHoursSum(self, projectId: str):
        query = f'''SELECT SUM(PlanHod) FROM [dbo].[PracovnikPlanFtfp] WHERE ProjektID = {projectId}'''
        table = self.cursor.execute(query)
        result_list = table.fetchall()
        return str(result_list[0][0]) if result_list[0][0] else ""

        
    def insert_row(self, worker_id, project_id, phase_id, planned_hours, modified_by):
        query = f'''INSERT INTO {self.DATA_RESOURCE} (PracovnikID, ProjektID, FazeID, PlanHod, ModifiedBy)
                VALUES ('{worker_id}', {project_id}, {phase_id}, {planned_hours}, '{modified_by}');'''
        self.cursor.execute(query)
        self.connection.commit()


    def delete_row(self, worker_id: str, project_id: str, phase: str):
        query = f'''DELETE FROM {self.DATA_RESOURCE} WHERE
                PracovnikID = '{worker_id}' AND ProjektID = {project_id} AND FazeID = {phase}'''
        self.cursor.execute(query)
        self.connection.commit()


    def clearTable(self):
        self.planned = []


    def __str__(self) -> str:
        return f"planned: {self.planned}"
