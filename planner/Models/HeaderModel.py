import datetime
from planner.Models.Model import Model


class HeaderModel(Model):
    def __init__(self):
        super().__init__()
        self.year_start = ""
        self.year_end = ""
        self.week_start = ""
        self.week_end = ""
        self.table_header = {"year_start": "", "year_end": "", "weeks": [], "working_hours": {}, "dates": []}

    def generate_table_header(self):
        data = self.sqlRead.read_date_week(self.year_start, self.week_start, self.year_end, self.week_end)
        self.table_header["weeks"] = []
        self.table_header["year_start"] = self.year_start
        self.table_header["year_end"] = self.year_end
        for record in data:
            self.table_header["weeks"].append(record[0])
            self.table_header["working_hours"][record[0]] = record[2]
            self.table_header["dates"].append(record[1])

    def set_start_end_dates(self, year_start: str, year_end: str, week_start: str, week_end: str):
        self.year_start = year_start
        self.year_end = year_end
        self.week_start = week_start
        self.week_end = week_end

    def set_header_based_on_week_number(self, week, year):
        date_range = 10
        week_start = (int(week) - date_range) % 53
        week_end = (int(week) + date_range) % 53
        if week_start > week_end:
            self.year_end = str(int(year) + 1)
        else:
            self.year_end = str(year)
        self.year_start = str(year)
        self.week_start = str(week_start)
        self.week_end = str(week_end)

    def set_header_based_on_date(self, day, month, year):
        week = datetime.date(int(year), int(month), int(day)).isocalendar()[1]
        self.set_header_based_on_week_number(week, year)

    def set_header_based_on_move(self, direction, week_start, week_end, year_start, year_end):
        date_range = 10
        if direction == "right":
            self.week_start = (int(week_start) + date_range) % 53
            self.week_end = (int(week_end) + date_range) % 53
            if int(week_start) > self.week_start:
                self.year_start = str(int(year_start) + 1)
            else:
                self.year_start = year_start
            if int(week_end) > self.week_end:
                self.year_end = str(int(self.year_start) + 1)
            else:
                self.year_end = year_end
        else:
            self.week_start = (int(week_start) - date_range) % 53
            self.week_end = (int(week_end) - date_range) % 53
            if int(week_end) < self.week_end:
                self.year_end = str(int(year_end) - 1)
            else:
                self.year_end = year_end
            if int(week_start) < self.week_start:
                self.year_start = str(int(self.year_end) - 1)
            else:
                self.year_start = year_start
        self.week_start = str(self.week_start)
        self.week_end = str(self.week_end)
