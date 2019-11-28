
import operator


class DataConvertor():
    '''takes data from SQl object, combine it and return appropriate JSON'''
    def __init__(self, sql):
        self.sql = sql
        self.y_start = sql.y_start
        self.y_end = sql.y_end
        self.weeks = []


    def insert_into_database(self, data):
        for row in data:
            if row["ProjektID"]:
                self.sql.write_insert_row_project(row["PracovnikID"], row["ZakazkaID"], row["ProjektID"], row["Rok"], row["Tyden"], row["PlanHod"], row["ModifiedBy"])
            else:
                self.sql.write_insert_row_opportunity(row["PracovnikID"], row["ZakazkaID"], row["Rok"], row["Tyden"], row["PlanHod"], row["ModifiedBy"])


    def update_row_in_database(self, data):
        for row in data:
            if row["ProjektID"]:
                self.sql.write_modify_changes_project(row["PracovnikID"], row["ZakazkaID"], row["ProjektID"], row["Rok"], row["Tyden"], row["PlanHod"], row["ModifiedBy"])
            else:
                self.sql.write_modify_changes_opportunity(row["PracovnikID"], row["ZakazkaID"], row["Rok"], row["Tyden"], row["PlanHod"], row["ModifiedBy"])

    def user_id_to_name(self):
        result = {}
        name_list = self.sql.read_Department()
        for row in name_list:
            result[row[0]] = row[2] + f" ({row[1]})"
        result = dict(sorted(result.items(), key=operator.itemgetter(1)))
        return result


    def table_header_data(self):   # {"week_number": date range, "week_number": date range, ...}
        result = {}
        datum_tyden = self.sql.read_DatumTyden()
        for record in datum_tyden:
            self.weeks.append(int(record[0][5:]))
            result[record[0][5:] + f" ({str(record[2])})"] = record[1].replace("(", "").replace(")", "")
        return result


    def work_summary_data(self): # {"user_id": {"41": x, "42": y, ...}, "user_id": {"41": x, "42": y, ...}, ...}
        result = {}
        plan = {}
        name_list_table = self.sql.read_Department()
        for i in range(len(name_list_table)):
            user_id = name_list_table[i][0]
            for week in self.weeks:
                plan[week] = ""
            worker_plan_table = self.sql.read_WorkerSummaryPlan(user_id)
            for row in worker_plan_table:
                plan[row[0]] = row[1]
            result[user_id] = plan.copy()
        result = dict(sorted(result.items()))
        return result


    def get_edit_plan_projects_data(self, user_id):  # {"project_id": {"41": x, "42": y, ...}, "project_id": {"41": x, "42": y, ...}, ...}
        result = {}
        plan = {}
        worker_plan_table = self.sql.read_WorkerPlan(user_id)
        for week in self.weeks:
            plan[week] = ""
        for row in worker_plan_table:
            val = 0
            if row[1] != None:
                try:
                    result[row[1]]
                    val = result[row[1]][row[3]]
                except KeyError:
                    result[row[1]] = plan.copy()
                finally:
                    if val and val != 0:
                        result[row[1]][row[3]] = row[4] + val
                    else:
                        result[row[1]][row[3]] = row[4]
        return result


    def edit_plan_projects_data(self, user_id): # {"project_name": {"41": x, "42": y, ...}, "project_name": {"41": x, "42": y, ...}, ...}
        projects_data = self.get_edit_plan_projects_data(user_id)
        for project_id in list(projects_data.keys()):
            project_name = self.sql.read_projects(project_id)[0][0] + " (" + self.sql.read_projects(project_id)[0][1] + ")"
            projects_data[project_name] = projects_data.pop(project_id)
        return projects_data


    def get_edit_plan_opportunity_data(self, user_id): # {"project_id": {"41": x, "42": y, ...}, "project_id": {"41": x, "42": y, ...}, ...}
        result = {}
        plan = {}
        worker_plan_table = self.sql.read_WorkerPlan(user_id)
        for week in self.weeks:
            plan[week] = ""
        for row in worker_plan_table:
            if row[1] == None and row[0] != None:
                try:
                    result[row[0]]
                except KeyError:
                    result[row[0]] = plan.copy()
                finally:
                    result[row[0]][row[3]] = row[4]
        return result


    def edit_plan_opportunity_data(self, user_id):
        opportunity_data = self.get_edit_plan_opportunity_data(user_id) # {"project_name": {"status": x, "plan": {"41": x, "42": y, ...}}, ...}
        # replace opportunity id with opportunity name
        for opportunity_id in list(opportunity_data.keys()):
            try:
                opportunity_name = self.sql.read_opportunity(opportunity_id)[0][0] + " (" + self.sql.read_opportunity(opportunity_id)[0][1] +")"
                opportunity_status = self.sql.read_opportunity(opportunity_id)[0][2]
            except:
                opportunity_name = "nedefinováno"
                opportunity_status = 3
            # opportunity_data[opportunity_name] = {"status": opportunity_status,
            #                                         "plan": opportunity_data.pop(opportunity_id)}
            opportunity_data[opportunity_name] = opportunity_data.pop(opportunity_id)
        return opportunity_data
