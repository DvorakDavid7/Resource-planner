from typing import List
from planner.Sql.SqlMain import SqlMain
from planner.Models.DataModels.DateRange import DateRange
from app_config import DevConfig

class ProjectSumaryTable(SqlMain):
 
    DATA_RESOURCE = ("[dbo].[View_ResourcePlanner_ProjektSummaryPlan_TEST]" 
                    if DevConfig.ENV == "DEVELOPMENT"
                    else "[dbo].[View_ResourcePlanner_ProjektSummaryPlan]")

    projectId: List[str] = []
    week: List[str] = []
    planned: List[str] = []

    def __init__(self) -> None:
        super().__init__()
        super().connect_to_database()


    def get_project_summary_plan(self, projectId, dateRange: DateRange) -> None:
        condition = (f"Rok = {dateRange.year_start} AND Tyden BETWEEN {dateRange.week_start} AND {dateRange.week_end}" 
            if dateRange.year_start == dateRange.year_end 
            else  f"((Tyden >= {dateRange.week_start} AND Rok = {dateRange.year_start}) OR (Tyden <= {dateRange.week_end} AND Rok = {dateRange.year_end}))")

        query = f'''SELECT [ProjektID], [Tyden], [Plan] FROM [dbo].[View_ResourcePlanner_ProjektSummaryPlan_TEST]
                WHERE ProjektID = {projectId} AND {condition}'''
        table = self.cursor.execute(query)
        for row in table:
            self.projectId.append(row[0])
            self.week.append(row[1])
            self.planned.append(row[2])

        
    def __str__(self) -> str:
        return f'''projectId: {self.projectId}\n
        week: {self.week}\n
        planned: {self.planned}'''

