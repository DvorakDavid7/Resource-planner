from typing import List
from planner.Sql.SqlMain import SqlMain
from planner.Models.DataModels.DateRange import DateRange
from app_config import DevConfig
from flask import current_app


class WorkerSummaryTable(SqlMain):
 
    def __init__(self) -> None:
        super().__init__()
        self.connect_to_database()

        self.workerId: List[str] = []
        self.workerFullName: List[str] = []
        self.department: List[str] = []
        self.years: List[str] = []
        self.weeks: List[str] = []
        self.planned: List[str] = []

        self.DATA_RESOURCE = ("[dbo].[View_ResourcePlanner_WorkerSummaryPlan_TEST]" if current_app.config["ENV"] != "PRODUCTION"
                            else "[dbo].[View_ResourcePlanner_WorkerSummaryPlan]")


    def get_worker_summary_plan(self, workerId: str, dateRange: DateRange) -> None:
        condition = (f"Rok = {dateRange.year_start} AND Tyden BETWEEN {dateRange.week_start} AND {dateRange.week_end}" 
        if dateRange.year_start == dateRange.year_end 
        else  f"((Tyden >= {dateRange.week_start} AND Rok = {dateRange.year_start}) OR (Tyden <= {dateRange.week_end} AND Rok = {dateRange.year_end}))")
    
        query = f'''SELECT [Tyden], [Plan], [Rok] FROM {self.DATA_RESOURCE}
                WHERE PracovnikID = '{workerId}' AND {condition}
                '''
        table = self.cursor.execute(query)
        for row in table:
            self.weeks.append(str(row[0]))
            self.planned.append(str(row[1]))
            self.years.append(str(row[2]))
    

    def clearTable(self):
        self.workerId = []
        self.workerFullName = []
        self.department = []
        self.years = []
        self.weeks = []
        self.planned = []
        
    def __str__(self) -> str:
        return f"week: {self.weeks}\nplanned: {self.planned}\nyears: {self.years}"

