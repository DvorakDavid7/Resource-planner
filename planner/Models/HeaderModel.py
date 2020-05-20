from typing import Dict, List
from planner.Models.Model import Model
from planner.Models.DataModels.DateRange import DateRange
from planner.Sql.DateWeekTable import DateWeekTable


class HeaderModel(Model):

    def __init__(self) -> None:
        super().__init__()
        self.dateWeekTable = DateWeekTable()

        self.dateRange: DateRange
        self.weeks: List[str] = []
        self.dates: List[str] = []
        self.workingHours: List[str] = []
    
    def set_dateRange(self, dateRange: DateRange):
        self.dateRange = dateRange

    def set_fromDatabese(self):
        self.dateWeekTable.read_date_week(self.dateRange)
        self.weeks = self.dateWeekTable.week
        self.dates = self.dateWeekTable.weekRange
        self.workingHours = self.dateWeekTable.numberOfHour
    
    def toDict(self) -> Dict:
        return {
            "dateRange": self.dateRange.__dict__,
            "currentWeek": self.dateRange.currentWeek,
            "currentYear": self.dateRange.currentYear,
            "weeks": self.weeks,
            "dates": self.dates,
            "workingHours": self.workingHours
        }
