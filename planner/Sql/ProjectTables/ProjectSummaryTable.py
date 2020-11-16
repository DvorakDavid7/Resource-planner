from typing import List
from planner.Sql.SqlMain import SqlMain
from planner.Models.DataModels.DateRange import DateRange
from flask import current_app


class ProjectSummaryTable(SqlMain):

    def __init__(self) -> None:
        super().__init__()
        super().connect_to_database()
        self.cid: List[str] = []
        self.week: List[str] = []
        self.planned: List[str] = []

        self.DATA_RESOURCE = ("[dbo].[View_ResourcePlanner_ProjektSummaryPlan_TEST]" if current_app.config["ENV"] != "PRODUCTION"
                        else "[dbo].[View_ResourcePlanner_ProjektSummaryPlan]")

    def get_project_summary_plan(self, cid, dateRange: DateRange) -> None:
        condition = (f"Rok = {dateRange.year_start} AND Tyden BETWEEN {dateRange.week_start} AND {dateRange.week_end}" 
            if dateRange.year_start == dateRange.year_end 
            else  f"((Tyden >= {dateRange.week_start} AND Rok = {dateRange.year_start}) OR (Tyden <= {dateRange.week_end} AND Rok = {dateRange.year_end}))")

        query = f'''SELECT [ZakazkaID], [Tyden], [Plan] FROM {self.DATA_RESOURCE}
                WHERE ZakazkaID = '{cid}' AND {condition}'''
        table = self.cursor.execute(query)
        for row in table:
            self.cid.append(row[0])
            self.week.append(str(row[1]))
            self.planned.append(row[2])
    

    def clearTable(self):
        self.cid = []
        self.week = []
        self.planned = []

        
    def __str__(self) -> str:
        return f'''cid: {self.cid}\n
        week: {self.week}\n
        planned: {self.planned}'''
