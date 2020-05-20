from typing import List
from planner.Sql.SqlMain import SqlMain
from planner.Models.DataModels.DateRange import DateRange
from app_config import DevConfig

class WorkerPlanTable(SqlMain):
 
    DATA_RESOURCE = "[dbo].[PracovnikPlan_TEST]" if DevConfig.ENV == "DEVELOPMENT" else "[dbo].[PracovnikPlan]"
    
    def __init__(self) -> None:
        super().__init__()
        super().connect_to_database()
        self.workerId: List[str] = []
        self.cid: List[str] = []
        self.typeZpid: List[str] = []
        self.year: List[str] = []
        self.week: List[str] = []
        self.planned: List[str] = []


    def get_worker_plan(self, workerId: str, typZPID: str, dateRange: DateRange) -> None:
        condition = (f"Rok = {dateRange.year_start} AND Tyden BETWEEN {dateRange.week_start} AND {dateRange.week_end}" 
            if dateRange.year_start == dateRange.year_end 
            else  f"((Tyden >= {dateRange.week_start} AND Rok = {dateRange.year_start}) OR (Tyden <= {dateRange.week_end} AND Rok = {dateRange.year_end}))")

        query = f'''SELECT [ZakazkaID], [Tyden], [PlanHod]
                FROM {self.DATA_RESOURCE}
                WHERE TypZPID = {typZPID} AND PracovnikID = '{workerId}' AND {condition}'''

        table = self.cursor.execute(query)
        for row in table:
            self.cid.append(row[0])
            self.week.append(str(row[1]))
            self.planned.append(row[2])

    
    def get_planned_hours(self, project_id: str, dateRange: DateRange) -> None:
        condition = (f"Rok = {dateRange.year_start} AND Tyden BETWEEN {dateRange.week_start} AND {dateRange.week_end}" 
            if dateRange.year_start == dateRange.year_end 
            else  f"((Tyden >= {dateRange.week_start} AND Rok = {dateRange.year_start}) OR (Tyden <= {dateRange.week_end} AND Rok = {dateRange.year_end}))")

        query = f'''SELECT [PlanHod], [Rok], [Tyden] FROM {WorkerPlanTable.DATA_RESOURCE}
                WHERE ProjektID = {project_id} AND {condition}'''
        table = self.cursor.execute(query)
        for row in table:
            self.planned.append(row[0])
            self.year.append(row[1])
            self.week.append(row[2])


    def get_workers_on_project(self, projectId: str, dateRange: DateRange) -> None:
        condition = (f"Rok = {dateRange.year_start} AND Tyden BETWEEN {dateRange.week_start} AND {dateRange.week_end}" 
            if dateRange.year_start == dateRange.year_end 
            else  f"((Tyden >= {dateRange.week_start} AND Rok = {dateRange.year_start}) OR (Tyden <= {dateRange.week_end} AND Rok = {dateRange.year_end}))")

        query = f'''SELECT [PracovnikID], [Rok], [Tyden], [PlanHod] FROM {WorkerPlanTable.DATA_RESOURCE}
                WHERE ProjektID = {projectId} AND {condition}'''
    
        table = self.cursor.execute(query)
        for row in table:
            self.workerId.append(row[0])
            self.year.append(row[1])
            self.week.append(row[2])
            self.planned.append(row[3])
        

    def get_worker_alocation(self, worker_id: str, dateRange: DateRange) -> str:
        query = f'''SELECT SUM(PlanHod) AS Alocation FROM {WorkerPlanTable.DATA_RESOURCE}
                WHERE PracovnikID = \'{worker_id}\' and Rok = {dateRange.year_start} and Tyden = {dateRange.week_start}'''
        table = self.cursor.execute(query)
        result_list = table.fetchall()
        return str(result_list[0][0]) if result_list[0][0] else "" 



    def delete_row(self, task_type: str, workerId: str, identifier: str, year: str, week: str) -> None:
        if task_type == "project":
            parameter = f"ZakazkaID IS NULL AND ProjektID = {identifier}"
        else:
            parameter = f"ZakazkaID = '{identifier}' AND ProjektID IS NULL"

        query = f'''DELETE FROM {WorkerPlanTable.DATA_RESOURCE} WHERE
                PracovnikID = \'{workerId}\' AND {parameter} AND Rok = {year} AND Tyden = {week}'''
        self.cursor.execute(query)
        self.connection.commit()


    def insert_row(self, task_type: str, workerId: str, identifier: str, year: str, week: str, planned_hours: str, modified_by: str) -> None:
        if task_type == "project":
            rows = "(PracovnikID, ProjektID, Rok, Tyden, PlanHod, ModifiedBy)"
        else:
            rows = "(PracovnikID, ZakazkaID, Rok, Tyden, PlanHod, ModifiedBy)"
            identifier = f"'{identifier}'"
        query = f'''INSERT INTO {WorkerPlanTable.DATA_RESOURCE} {rows}
                VALUES ('{workerId}', {identifier}, {year}, {week}, {planned_hours}, '{modified_by}');'''
        self.cursor.execute(query)
        self.connection.commit()

    
    def __str__(self) -> str:
        return f'''cid: {self.cid}\n
            week: {self.week}\n
            planned: {self.planned}\n
            year: {self.year}\n
            workerId: {self.workerId}\n'''

