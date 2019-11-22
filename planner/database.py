import pyodbc
from app_config import CONECTION_STRING
from datetime import datetime, timedelta, date
import calendar
import operator


class DateManager():
    def __init__(self):
        self.current_day = date.today()
        # self.current_day = date(2019, 11, 14)  # date.today()
        self.range = 5

    @staticmethod
    def day_to_week_number(datestring):
        day = datestring                        #  '07.11.2019'
        dt = datetime.strptime(day, '%Y-%m-%d')
        wk = dt.isocalendar()[1]
        return wk

    def get_range(self):
        date_start = str(self.current_day - timedelta(days=self.range * 7))
        date_end = str(self.current_day + timedelta(days=self.range * 7))
        return [date_start, date_end]

    def dates_range(self):
        get_range = self.get_range()
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


class SQL:
    '''write and read data from database'''

    def __init__(self, dateManager):
        CONECTION_STRING = '''Driver={ODBC Driver 17 for SQL Server};
                            Server=tcp:dwhdbsrv.database.windows.net,1433;
                            Database=DWH-DB;Uid=ddvorak@trask.cz;
                            Pwd=2gHmDME6;
                            Encrypt=yes;
                            TrustServerCertificate=no;
                            Connection Timeout=30;
                            Authentication=ActiveDirectoryPassword'''
                            
        self.cnxn = pyodbc.connect(CONECTION_STRING)
        self.cursor = self.cnxn.cursor()
        self.data_resources = {
            "datumTyden": "[dbo].[View_ResourcePlanner_DatumTyden]",
            "NameList": "[dbo].[View_ResourcePlanner_Department]",
            "SummaryPlan": "[dbo].[View_ResourcePlanner_WorkerSummaryPlan]",
            "ProjektySeznam": "[dbo].[View_ResourcePlanner_ProjektySeznam]",
            "PrilezitostiSeznam": "[dbo].[View_ResourcePlanner_PrilezitostiSeznam]",
            "PracovnikPlan": "[dbo].[PracovnikPlan]",

            "Zapis": "[dbo].[PracovnikPlan_TEST]",
        }
        self.dateManager = dateManager


    def set_department(self, department):
        if len(department) == 2:
            self.department = department #str(('IA', 'CC'))
        else:
            department = str(tuple(department.split(" ")))
            self.department = department


    def set_date_range(self):
        self.dates_range = self.dateManager.dates_range()
        self.w_start = self.dates_range["week_start"]
        self.w_end = self.dates_range["week_end"]
        self.y_start = self.dates_range["year_start"]
        self.y_end = self.dates_range["year_end"]


    def read_DatumTyden(self):
        data = []
        query = f'''SELECT [Tyden], [TydenFormat], [PocetHodin] FROM {self.data_resources['datumTyden']}
                WHERE Tyden BETWEEN \'{self.y_start}-{self.w_start}\' AND \'{self.y_end}-{self.w_end}\''''
        table = self.cursor.execute(query)
        for row in table:
            data.append(row)
        return data  # [(x,x,x), (x,x,x), ...]


    def read_Department(self): # name list from department table
        data = []
        query1 = f'''SELECT DISTINCT [PracovnikID], [OddeleniID], [CeleJmeno] FROM {self.data_resources['NameList']}
                WHERE OddeleniID IN {self.department}'''
        query2 = f'''SELECT DISTINCT [PracovnikID], [OddeleniID], [CeleJmeno] FROM {self.data_resources['NameList']}
                WHERE OddeleniID = \'{self.department}\''''

        if len(self.department) == 2:
            table = self.cursor.execute(query2)
        else:
            table = self.cursor.execute(query1)
        for row in table:
            data.append(row)
        return data  # [(x,x,x), (x,x,x), ...]


    def read_WorkerSummaryPlan(self, name):
        data = []
        query1 = f'''SELECT [Tyden], [Plan] FROM {self.data_resources["SummaryPlan"]}
                WHERE PracovnikID = \'{name}\' AND ((Tyden >= {self.w_start} AND Rok = {self.y_start}) OR (Tyden <= {self.w_end} AND Rok = {self.y_end}))'''
        query2 = f'''SELECT [Tyden], [Plan] FROM {self.data_resources["SummaryPlan"]}
                WHERE PracovnikID = \'{name}\' AND Tyden BETWEEN {self.w_start} AND {self.w_end}'''
        if self.y_start == self.y_end:
            table = self.cursor.execute(query2)
        else:
            table = self.cursor.execute(query1)
        for row in table:
            data.append(row)
        return data  # [(x,x), (x,x), ...]


    def read_projects(self, project_id):
        data = []
        query = f'''SELECT [CID+Nazev], [ProjektovyManazerJmeno] FROM {self.data_resources["ProjektySeznam"]}
                WHERE ProjektID = {project_id}'''
        table = self.cursor.execute(query)
        for row in table:
            data.append(row)
        return data  # [(x,x,x), (x,x,x), ...]


    def read_opportunity(self, zakazka_id):
        data = []
        query = f'''SELECT [CID+Nazev], [ProjektovyManazerJmeno], [Status] FROM {self.data_resources["PrilezitostiSeznam"]}
                WHERE ZakazkaID = \'{zakazka_id}\''''
        table = self.cursor.execute(query)
        for row in table:
            data.append(row)
        return data  # [(x,x,x), (x,x,x), ...]


    def read_WorkerPlan(self, user_id):
        data = []
        query1 = f'''SELECT [ZakazkaID], [ProjektID], [Rok], [Tyden], [PlanHod]
                FROM {self.data_resources["PracovnikPlan"]} WHERE PracovnikID = \'{user_id}\'
                AND ((Tyden >= {self.w_start} AND Rok = {self.y_start}) OR (Tyden <= {self.w_end} AND Rok = {self.y_end}))'''

        query2 = f'''SELECT [ZakazkaID], [ProjektID], [Rok], [Tyden], [PlanHod]
                FROM {self.data_resources["PracovnikPlan"]} WHERE PracovnikID = \'{user_id}\' AND Tyden BETWEEN {self.w_start} AND {self.w_end} AND Rok = {self.y_start}'''
        if self.y_start == self.y_end:
            table = self.cursor.execute(query2)
        else:
            table = self.cursor.execute(query1)
        for row in table:
            data.append(row)
        return data  # [(x,x), (x,x), ...]


    def write_modify_changes_project(self, PracovnikID, ZakazkaID, ProjektID, Rok, Tyden, PlanHod, ModifiedBy):
        query = f'''UPDATE {self.data_resources['Zapis']} SET
                PlanHod = {PlanHod} WHERE
                PracovnikID = \'{PracovnikID}\' AND
                ZakazkaID = \'{ZakazkaID}\' AND
                ProjektID = {ProjektID} AND
                Rok = {Rok} AND
                Tyden = {Tyden} AND
                ModifiedBy = \'{ModifiedBy}\''''
        self.cursor.execute(query)
        self.cnxn.commit()


    def write_modify_changes_opportunity(self, PracovnikID, ZakazkaID, Rok, Tyden, PlanHod, ModifiedBy):
        query = f'''UPDATE {self.data_resources['Zapis']} SET
                PlanHod = {PlanHod} WHERE
                PracovnikID = \'{PracovnikID}\' AND
                ZakazkaID = \'{ZakazkaID}\' AND
                Rok = {Rok} AND
                Tyden = {Tyden} AND
                ModifiedBy = \'{ModifiedBy}\''''
        self.cursor.execute(query)
        self.cnxn.commit()


    def write_insert_row_project(self, PracovnikID, ZakazkaID, ProjektID, Rok, Tyden, PlanHod, ModifiedBy):
        query = f'''INSERT INTO {self.data_resources['Zapis']} (PracovnikID, ZakazkaID, ProjektID, Rok, Tyden, PlanHod, ModifiedBy)
                VALUES (\'{PracovnikID}\', \'{ZakazkaID}\', {ProjektID}, {Rok}, {Tyden}, {PlanHod}, \'{ModifiedBy}\');'''
        self.cursor.execute(query)
        self.cnxn.commit()


    def write_insert_row_opportunity(self, PracovnikID, ZakazkaID, Rok, Tyden, PlanHod, ModifiedBy):
        query = f'''INSERT INTO {self.data_resources['Zapis']} (PracovnikID, ZakazkaID, Rok, Tyden, PlanHod, ModifiedBy)
                VALUES (\'{PracovnikID}\', \'{ZakazkaID}\', {Rok}, {Tyden}, {PlanHod}, \'{ModifiedBy}\');'''
        self.cursor.execute(query)
        self.cnxn.commit()


    def read_find_record_in_database(self, PracovnikID, Rok, Tyden, ZakazkaID, ProjektID):
        data = []
        query = f'''SELECT * FROM {self.data_resources['Zapis']} WHERE Tyden = {Tyden} AND Rok = {Rok} AND PracovnikID = \'{PracovnikID}\'
        AND ZakazkaID = \'{ZakazkaID}\' AND ProjektID = {ProjektID}'''
        table = self.cursor.execute(query)
        for row in table:
            data.append(row)
        return data  # [(x,x,x), (x,x,x), ...]

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




class DataHolder():
    def __init__(self, dataConvertor):
        self.dataConvertor = dataConvertor
        self.weeks = self.dataConvertor.weeks

        self.y_start = self.dataConvertor.y_start
        self.y_end = self.dataConvertor.y_end

    def load_table_header(self):
        return self.dataConvertor.table_header_data()

    def load_data_for_work_summary(self):
        self.names = self.dataConvertor.user_id_to_name().copy()
        return self.dataConvertor.work_summary_data()

    def load_data_for_edit(self, user_id):
        self.projects = self.dataConvertor.edit_plan_projects_data(user_id)
        self.opportunity = self.dataConvertor.edit_plan_opportunity_data(user_id)


class Table():
    def __init__(self, dataHolder):
        self.dataHolder = dataHolder
        self.weeks = self.dataHolder.weeks

    def load_header(self):
        table_header = self.dataHolder.load_table_header()
        self.header_columns = list(table_header.keys())
        self.header_content = table_header
        self.y_start = self.dataHolder.y_start
        self.y_end = self.dataHolder.y_end


    def load_content_overview(self):
        self.content = self.dataHolder.load_data_for_work_summary()
        self.names = self.dataHolder.names
        self.rows = list(self.names.keys())

    def load_content_edit(self, user_id):
        self.dataHolder.load_data_for_edit(user_id)

        self.rows_projects = list(self.dataHolder.projects.keys())
        self.rows_opportunity = list(self.dataHolder.opportunity.keys())
        self.rows_complet = self.rows_projects + self.rows_opportunity

        self.content_projects = self.dataHolder.projects
        self.content_opportunity = self.dataHolder.opportunity
        self.content_complet = {**self.content_projects, **self.content_opportunity}

        self.sum = []
        for week in self.weeks:
            tmp = 0
            for row in self.rows_complet:
                if self.content_complet[row][week] != "":
                    tmp += int(self.content_complet[row][week])
            self.sum.append(tmp)



# dateManager = DateManager()
# sql = SQL(dateManager)
# sql.set_date_range()
# dataConvertor = DataConvertor(sql)
# dataHolder = DataHolder(dataConvertor)
# table = Table(dataHolder)
# table.load_header()
# table.load_content_edit("mbendik")
# print(table.sum)


# x = DataConvertor()
# print(x.edit_plan_opportunity_data("jadam"))
