import planner
from planner.sql import SQL
from datetime import datetime, timedelta, date


class Table():
    def __init__(self, sql, dateManager):
        self.sql = sql
        self.dateManager = dateManager
        self.weeks = []


    def set_date_range(self, current_day, range=5):
        self.current_day = current_day
        dates_range = self.dateManager.dates_range(current_day, range)
        self.week_start = dates_range["week_start"]
        self.week_end = dates_range["week_end"]
        self.year_start = dates_range["year_start"]
        self.year_end = dates_range["year_end"]

    def set_department(self, department):
        if len(department) == 2:
            self.department = department #str(('IA', 'CC'))
        else:
            department = str(tuple(department.split(" ")))
            self.department = department


    def complete_overwie_table(self):
        table = {"header": {}, "body": []}
        header = self.generate_header()
        body = self.generate_overwie()
        table["header"] = header.copy()
        table["body"] = body
        return table


    def complete_edit_table(self, user_id):
        table = {"header": {}, "body": {"projects": [], "opportunity": []}}
        header = self.generate_header()
        body = self.generate_edit(user_id)
        table["header"] = header.copy()
        table["body"]["projects"] = body["projects"]
        table["body"]["opportunity"] = body["opportunity"]
        return table


    def generate_header(self):
        table_header = {"year_start": "", "year_end":"", "weeks": [], "working_hours": {}, "dates": []}
        data = self.sql.read_DatumTyden(self.year_start, self.week_start, self.year_end, self.week_end)
        self.weeks = []
        for record in data:
            self.weeks.append(int(record[0].split("-")[1]))
            table_header["working_hours"][int(record[0].split("-")[1])] = str(record[2])
            table_header["dates"].append(record[1].replace("(", "").replace(")", ""))
        table_header["weeks"] = self.weeks
        table_header["year_start"] =self.year_start
        table_header["year_end"] = self.year_end
        return table_header


    def generate_overwie(self):
        table_body = []
        result = {"id": "", "user_id": "", "deparment": "", "name": "", "values":{}}
        plan = {}
        name_list_table = self.sql.read_Department(self.department)
        for i in range(len(name_list_table)):
            user_id = name_list_table[i][0]
            for week in self.weeks:
                plan[week] = ""
            worker_plan_table = self.sql.read_WorkerSummaryPlan(user_id, self.year_start,
                                            self.week_start, self.year_end, self.week_end)
            for row in worker_plan_table:
                plan[row[0]] = row[1]
            result["id"] = i
            result["user_id"] = user_id
            result["deparment"] = name_list_table[i][1]
            result["name"] = name_list_table[i][2]
            result["values"] = plan.copy()
            table_body.append(result.copy())
        return table_body


    def generate_edit(self,user_id):
        table_body = {"projects": [], "opportunity": []}
        result = {}
        plan = {}
        worker_plan_table = self.sql.read_WorkerPlan(user_id, self.year_start,
                                    self.week_start, self.year_end, self.week_end)
        for week in self.weeks:
            plan[week] = ""
        for row in worker_plan_table: # {"project_id": {"41": x, "42": y, ...}, "project_id": {"41": x, "42": y, ...}, ...}
            zakazka_id = row[0];projekt_id = row[1];rok = row[2];tyden = row[3];planovano = row[4]
            current_value = 0
            key = str(projekt_id) + "~" + str(zakazka_id)
            if key in result:
                current_value = result[key][int(tyden)]
            else:
                result[key] = plan.copy()
            if current_value and current_value != 0:
                result[key][tyden] = planovano + current_value
            else:
                result[key][tyden] = planovano
        for key in result:
            project_id = key.split("~")[0]
            zakazka_id = key.split("~")[1]
            if project_id != "None":  # projekt
                project_informations = self.sql.read_projects(project_id)
                project_name = project_informations[0][0]
                projekt_manager = project_informations[0][1]
                zakazka_id = project_informations[0][2]
                f = {"project_id": project_id, "zakazka_id": zakazka_id,
                    "nazev":project_name, "project_manager":projekt_manager,
                     "values" : result[key]}
                table_body["projects"].append(f.copy())
            else:   # příležitost
                try:
                    opportunity_informations = self.sql.read_opportunity(zakazka_id)
                    opportunity_name = opportunity_informations[0][0]
                    projekt_manager = opportunity_informations[0][1]
                    opportunity_status = opportunity_informations[0][2]
                    zakazka_id = opportunity_informations[0][3]
                except:
                    opportunity_name = "nedefinováno"
                    projekt_manager = ""
                    opportunity_status = 0

                f = {"status": opportunity_status, "zakazka_id": zakazka_id,
                    "nazev":opportunity_name, "project_manager":projekt_manager,
                    "values" : result[key]}
                table_body["opportunity"].append(f.copy())
        return table_body




class DateManager():
    def __init__(self):
        pass

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
        return {"week_start": self.week_start, "year_start": self.year_star,
                "week_end": self.week_end, "year_end": self.year_end}
