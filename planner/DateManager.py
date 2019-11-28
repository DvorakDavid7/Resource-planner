from datetime import datetime, timedelta, date




class DateManager():
    def __init__(self):
        pass
        # # self.current_day = date.today()
        # self.current_day = date(2020, 2, 3)  # date.today()
        # self.range = 5

    @staticmethod
    def day_to_week_number(datestring):
        day = datestring                        #  '07.11.2019'
        dt = datetime.strptime(day, '%Y-%m-%d')
        wk = dt.isocalendar()[1]
        return wk

    def get_range(self, current_day, range):
        date_start = str(current_day - timedelta(days=range * 7))
        date_end = str(current_day + timedelta(days=range * 7))
        return [date_start, date_end]

    def dates_range(self, current_day, range):
        get_range = self.get_range(current_day, range)
        self.year_star = get_range[0][:4]
        self.year_end = get_range[1][:4]
        week_start = self.day_to_week_number(get_range[0])
        week_end = self.day_to_week_number(get_range[1])
        if week_start < 10:
            self.week_start = "0" + str(week_start)
        else:
            self.week_start = str(week_start)
        if week_end < 10:
            self.week_end = "0" + str(week_end)
        else:
            self.week_end = str(week_end)
        return {"week_start": self.week_start, "year_start": self.year_star, "week_end": self.week_end, "year_end": self.year_end}

    # def dates_range(self):
    #     get_range = self.get_range()
    #     self.year_start = get_range[0][:4]
    #     self.year_end = get_range[1][:4]
    #
    #     week_start = self.day_to_week_number(get_range[0])
    #     week_end = self.day_to_week_number(get_range[1])
    #     if week_start < 10:
    #         self.week_start = "0" + str(week_start)
    #     else:
    #         self.week_start = str(week_start)
    #     if week_end < 10:
    #         self.week_end = "0" + str(week_end)
    #     else:
    #         self.week_end = str(week_end)
    #     if self.week_end == "01" and self.week_start == "43" and self.year_end == self.year_start:
    #         self.year_end = str(int(self.year_end) + 1)
    #
    #     if self.week_start == "01":
    #         self.year_start = str(int(self.year_start) + 1)
    #     return {"week_start": self.week_start, "year_start": self.year_start, "week_end": self.week_end, "year_end": self.year_end}


# x = DateManager()
# print(x.dates_range())
