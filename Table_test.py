import planner
from planner.sql import SQL
from planner.DateManager import DateManager
import datetime


class Table_test():
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
        table_header = {"year_start": "", "year_end":"", "weeks": [], "working_hours": [], "dates": []}
        data = self.sql.read_DatumTyden(self.year_start, self.week_start, self.year_end, self.week_end)
        self.weeks = []
        for record in data:
            self.weeks.append(int(record[0].split("-")[1]))
            table_header["working_hours"].append(record[0].split("-")[1] + "(" + str(record[2]) + ")" )
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
            worker_plan_table = self.sql.read_WorkerSummaryPlan(user_id, self.year_start, self.week_start, self.year_end, self.week_end)
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
        worker_plan_table = self.sql.read_WorkerPlan(user_id, self.year_start, self.week_start, self.year_end, self.week_end)
        for week in self.weeks:
            plan[week] = ""
        for row in worker_plan_table: # {"project_id": {"41": x, "42": y, ...}, "project_id": {"41": x, "42": y, ...}, ...}
            zakazka_id = row[0];projekt_id = row[1];rok = row[2];tyden = row[3];planovano = row[4]
            current_value = 0
            key = str(projekt_id) + "~" + str(zakazka_id)
            if key in result:
                current_value = result[key][tyden]
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
                f = {"project_id": project_id, "nazev":project_name, "project_manager":projekt_manager, "values" : result[key]}
                table_body["projects"].append(f.copy())
            else:   # příležitost
                try:
                    opportunity_informations = self.sql.read_opportunity(zakazka_id)
                    opportunity_name = opportunity_informations[0][0]
                    projekt_manager = opportunity_informations[0][1]
                    opportunity_status = opportunity_informations[0][2]
                except:
                    opportunity_name = "nedefinováno"
                    projekt_manager = ""
                    opportunity_status = 0

                f = {"status": opportunity_status, "nazev":opportunity_name, "project_manager":projekt_manager, "values" : result[key]}
                table_body["opportunity"].append(f.copy())
        return table_body


# current_day = datetime.date(2019, 10, 20)
#
# sql = SQL()
# dateManager = DateManager()
# table = Table_test(sql, dateManager)
#
# table.set_date_range(current_day)
# table.set_department("IA")
#
# print(table.complete_edit_table("pmarek"))
