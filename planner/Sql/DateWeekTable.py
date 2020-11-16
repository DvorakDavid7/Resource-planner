from typing import List
from planner.Sql.SqlMain import SqlMain
from planner.Models.DataModels.DateRange import DateRange


class DateWeekTable(SqlMain):

    DATA_RESOURCE = "[dbo].[View_ResourcePlanner_DatumTyden]"

    def __init__(self) -> None:
        super().__init__()
        super().connect_to_database()

        self.year: List[int] = []
        self.week: List[str] = []
        self.weekRange: List[str] = []
        self.numberOfHour: List[str] = []

    def read_date_week(self, dateRange: DateRange) -> None:
        week_start = dateRange.week_start if len(dateRange.week_start) != 1 else  "0" + dateRange.week_start
        week_end = dateRange.week_end if len(dateRange.week_end) != 1 else  "0" + dateRange.week_end

        query = f'''SELECT [Tyden], [TydenFormat], [PocetHodin] FROM {DateWeekTable.DATA_RESOURCE}
                    WHERE Tyden BETWEEN \'{dateRange.year_start}-{week_start}\' 
                    AND \'{dateRange.year_end}-{week_end}\'
                '''
        rows = self.cursor.execute(query).fetchall()
        for row in rows:
            self.week.append(row[0].split("-")[1])
            self.weekRange.append(row[1].replace("(", "").replace(")", ""))
            self.numberOfHour.append(str(row[2]))

    def __str__(self) -> str:
        return f"weeks: {self.week}\nweekRange: {self.weekRange}\nnumberOfHours: {self.numberOfHour}"

