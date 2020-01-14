from planner.Models.ReadModel import ReadModel
import datetime


class Controller:
    def __init__(self):
        self.read_model = ReadModel()
        self.year_start = ""
        self.year_end = ""
        self.week_start = ""
        self.week_end = ""
        self.table_header = {"year_start": "", "year_end": "", "weeks": [], "working_hours": {}, "dates": []}

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

    def generate_table_header(self):
        data = self.read_model.read_date_week(self.year_start, self.week_start, self.year_end, self.week_end)
        self.table_header["weeks"] = []
        self.table_header["year_start"] = self.year_start
        self.table_header["year_end"] = self.year_end
        for record in data:
            self.table_header["weeks"].append(record[0])
            self.table_header["working_hours"][record[0]] = record[2]
            self.table_header["dates"].append(record[1])

    def navigation_handler(self, receive_data):
        if receive_data["request_type"] == "set_range":
            self.set_start_end_dates(receive_data["data"]["year_start"], receive_data["data"]["year_end"],
                                     receive_data["data"]["week_start"], receive_data["data"]["week_end"])
            return True
        elif receive_data["request_type"] == "set_date":
            if receive_data["data"]["input_type"] == "set_week":
                self.set_header_based_on_week_number(receive_data["data"]["week"], receive_data["data"]["year"])
            elif receive_data["data"]["input_type"] == "set_date":
                self.set_header_based_on_date(receive_data["data"]["day"], receive_data["data"]["month"],
                                              receive_data["data"]["year"])
            return True
        elif receive_data["request_type"] == "move":
            self.set_header_based_on_move(receive_data["data"]["direction"], receive_data["data"]["week_start"],
                                          receive_data["data"]["week_end"], receive_data["data"]["year_start"],
                                          receive_data["data"]["year_end"])
            return True
        else:
            return False
