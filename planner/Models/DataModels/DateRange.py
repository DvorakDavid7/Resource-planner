import datetime


class DateRange():
    def __init__(self, year_start: str, year_end: str, week_start: str, week_end: str) -> None:
        self.year_start = year_start
        self.year_end = year_end

        self.week_start = week_start
        self.week_end = week_end
    
    def __str__(self) -> str:
        return f"{self.week_start}/{self.year_start} {self.week_end}/{self.year_end}"

    @property
    def currentWeek(self):
        current_day = datetime.date.today()
        dt = datetime.datetime.strptime(str(current_day), '%Y-%m-%d')
        week = str(dt.isocalendar()[1])
        return "0" + week if len(week) == 1 else week

    @property
    def currentYear(self):
        return str(datetime.datetime.now().year)

    
    def set_basedOnWeekNumber(self, weekNumber: str, year: str) -> None:
        """set dafault: current week - 2, current week + 19"""
        stepDown = 2
        stepUp = 19
        d = f"{year}-W{weekNumber}"
        date_from_week = datetime.datetime.strptime(d + '-1', "%Y-W%W-%w")
        date_start = date_from_week - datetime.timedelta(weeks=stepDown + 1)
        date_end = date_from_week + datetime.timedelta(weeks=stepUp - 1)
        self.year_start = str(date_start.year)
        self.year_end = str(date_end.year)
        self.week_start = str(date_start.isocalendar()[1])
        self.week_end = str(date_end.isocalendar()[1])

'''
dr = DateRange("", "", "", "")
dr.set_basedOnWeekNumber(dr.currentWeek, dr.currentYear, 2, 19)
print(f"{dr.week_start} {dr.year_start}")
print(f"{dr.week_end} {dr.year_end}")
'''