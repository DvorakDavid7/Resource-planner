from typing import Dict, List
from planner.Models.Model import Model
from planner.Models.DataModels.DateRange import DateRange
from planner.Sql.DateWeekTable import DateWeekTable
import datetime

class HeaderModel(Model):

    def __init__(self) -> None:
        super().__init__()
        self.dateWeekTable = DateWeekTable()

        self.dateRange: DateRange
        self.currentWeek: str = ""
        self.currentYear: str = ""
        self.weeks: List[str] = []
        self.dates: List[str] = []
        self.workingHours: List[str] = []
    
    def set_dateRange(self, dateRange: DateRange):
        self.dateRange = dateRange
    

    def set_currents(self):
        current_day = datetime.date.today()
        dt = datetime.datetime.strptime(str(current_day), '%Y-%m-%d')
        week = str(dt.isocalendar()[1])
        self.currentWeek = "0" + week if len(week) == 1 else week
        self.currentYear = str(datetime.datetime.now().year)

    
    def set_fromDatabese(self):
        self.dateWeekTable.read_date_week(self.dateRange)
        self.weeks = self.dateWeekTable.week
        self.dates = self.dateWeekTable.weekRange
        self.workingHours = self.dateWeekTable.numberOfHour
    
    def toDict(self) -> Dict:
        return {
            "dateRange": self.dateRange.__dict__,
            "currentWeek": self.currentWeek,
            "currentYear": self.currentYear,
            "weeks": self.weeks,
            "dates": self.dates,
            "workingHours": self.workingHours
        }
