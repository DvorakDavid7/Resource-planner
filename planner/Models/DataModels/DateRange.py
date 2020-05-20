
import datetime

class DateRange():
    def __init__(self, year_start: str, year_end: str, week_start: str, week_end: str) -> None:
        self.year_start = year_start
        self.year_end = year_end

        self.week_start = week_start
        self.week_end = week_end

    @property
    def currentWeek(self):
        current_day = datetime.date.today()
        dt = datetime.datetime.strptime(str(current_day), '%Y-%m-%d')
        week = str(dt.isocalendar()[1])
        return "0" + week if len(week) == 1 else week

    @property
    def currentYear(self):
        return str(datetime.datetime.now().year)
