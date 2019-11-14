import pyodbc
from app_config import CONECTION_STRING
from datetime import datetime, timedelta, date
import calendar


class DateManager():
    def __init__(self):
        self.current_day = date(2019, 11, 14)  # date.today()
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

    def __init__(self):
        self.cnxn = pyodbc.connect(CONECTION_STRING)
        self.cursor = self.cnxn.cursor()
        self.data_resources = {
            "datumTyden": "[dbo].[View_ResourcePlanner_DatumTyden]",
            "NameList": "[dbo].[View_ResourcePlanner_Department]",
            "SummaryPlan": "[dbo].[View_ResourcePlanner_WorkerSummaryPlan]",
            "realVsPlan": "[dbo].[View_ResourcePlanner_RealVsPlan]",
        }
        self.dateManager = DateManager()
        dates_range = self.dateManager.dates_range()
        self.w_start = dates_range["week_start"]
        self.w_end = dates_range["week_end"]
        self.y_start = dates_range["year_start"]
        self.y_end = dates_range["year_end"]


    def read_DatumTyden(self):
        data = []
        query = f'''SELECT [Tyden], [TydenFormat], [PocetHodin] FROM {self.data_resources['datumTyden']}
                WHERE Tyden BETWEEN \'{self.y_start}-{self.w_start}\' AND \'{self.y_end}-{self.w_end}\''''
        table = self.cursor.execute(query)
        for row in table:
            data.append(row)
        return data  # [(x,x,x), (x,x,x), ...]


    def read_Department(self, department): # name list from department table
        data = []
        query = f'''SELECT DISTINCT [PracovnikID], [OddeleniID], [CeleJmeno] FROM {self.data_resources['NameList']}
                WHERE OddeleniID = \'{department}\''''
        table = self.cursor.execute(query)
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


    def read_projects(self):
        data = []
        query = f'''SELECT DISTINCT [PracovnikID], [OddeleniID], [CeleJmeno] FROM {self.data_resources['NameList']}
                WHERE OddeleniID = \'{department}\''''

        table = self.cursor.execute(query)
        for row in table:
            data.append(row)
        return data  # [(x,x,x), (x,x,x), ...]


    def read_opportunity(self):
        pass



class DataConvertor():
    '''takes data from SQl object, combine it and return appropriate JSON'''
    def __init__(self):
        self.sql = SQL()
        self.weeks = []

    def table_header_data(self):   # {"week_number": date range, "week_number": date range, ...}
        result = {}
        datum_tyden = self.sql.read_DatumTyden()
        for record in datum_tyden:
            self.weeks.append(int(record[0][5:]))
            result[record[0][5:] + f" ({str(record[2])})"] = record[1].replace("(", "").replace(")", "")
        return result


    def work_summary_data(self, department):
        result = {}
        plan = {}
        name_list_table = self.sql.read_Department(department)
        for i in range(len(name_list_table)):
            user_id = name_list_table[i][0]
            for week in self.weeks:
                plan[week] = ""
            worker_plan_table = self.sql.read_WorkerSummaryPlan(user_id)
            for row in worker_plan_table:
                plan[row[0]] = row[1]
            result[name_list_table[i][2]] = plan.copy()
        result = dict(sorted(result.items()))
        return result



class DataHolder():
    def __init__(self):
        self.dataConvertor = DataConvertor()
        self.weeks = self.dataConvertor.weeks

    def load_table_header(self):
        return self.dataConvertor.table_header_data()

    def load_data_for_work_summary(self, department):
        return self.dataConvertor.work_summary_data(department)



class Table():
    def __init__(self, type):
        self.dataHolder = DataHolder()
        self.weeks = self.dataHolder.weeks
        self.type = type

        self.header_columns = []
        self.header_content = {}

        self.rows = []
        self.content = {}

    def load_header(self):
        table_header = self.dataHolder.load_table_header()
        self.header_columns = list(table_header.keys())
        self.header_content = table_header

    def load_content(self):
        if self.type == "overview":
            work_summary = self.dataHolder.load_data_for_work_summary("IA")
            self.rows = list(work_summary.keys())
            self.content = work_summary

        elif self.type == "edit":
            pass


# x = Table("overview")
# x.load_content()
# x.load_header()
# print(x.weeks)
















# class DataConvertor2():
#     """data from database to json form."""
#
#     def __init__(self):
#         self.cnxn = pyodbc.connect(CONECTION_STRING)
#         self.cursor = self.cnxn.cursor()
#         self.data_resources = {
#             "datumTyden": "[dbo].[View_ResourcePlanner_DatumTyden]",
#             "workerPlan": "[dbo].[View_ResourcePlanner_WorkerSummaryPlan]",
#             "realVsPlan": "[dbo].[View_ResourcePlanner_RealVsPlan]",
#         }
#
#         self.dateManager = DateManager()
#         self.table_header_data = self.get_table_header_data(5)
#         self.start_year = self.table_header_data["years"][0]
#         self.end_year = self.table_header_data["years"][1]
#
#         self.start = int(self.table_header_data["range"][0])
#         self.end = int(self.table_header_data["range"][1])
#
#         self.weeks = []
#         tmp1 = self.start
#         tmp2 = self.end
#         while tmp1 != tmp2 + 1:
#             self.weeks.append(tmp1)
#             tmp1 = tmp1 % 53 + 1
#
#
#     def get_table_header_data(self, range):
#         data = []
#         result = {}
#         wr = self.dateManager.dates_range()
#         year_star = wr["year_start"]; start = wr["week_start"]; year_end = wr["year_end"]; end = wr["week_end"]
#         query = self.cursor.execute(f'''SELECT * FROM {self.data_resources['datumTyden']}
#                                     WHERE Tyden BETWEEN \'{year_star}-{start}\' AND \'{year_end}-{end}\'''')
#         for row in query:
#             data.append([row[1], row[2].replace("(", "").replace(")", "")])
#         for record in data:
#             result[record[0][5:]] = record[1]
#         return {"range":[wr["week_start"], wr["week_end"]], "years":[wr["year_start"], wr["year_end"]] ,"content":result}
#
#
#     def get_name_list_for_work_summary(self, department):
#         name_list=  []
#         query = self.cursor.execute(f'''SELECT DISTINCT [PracovnikID]
#                                     FROM {self.data_resources['workerPlan']}
#                                     WHERE OddeleniID = \'{department}\' AND (Tyden >= {self.start} AND Rok = {self.start_year} OR Tyden <= {self.end} AND Rok = {self.end_year})''')
#         for row in query:
#             name_list.append(row[0])
#         return name_list
#
#
#     def get_work_summary_data(self, department):
#         name_list = self.get_name_list_for_work_summary(department)
#         data = {}
#         result = {}
#         for name in name_list:
#             for i in range(len(self.weeks)):
#                 result[self.weeks[i]] = ""
#             query = self.cursor.execute(f'''SELECT [Tyden], [Plan]
#                                         FROM {self.data_resources['workerPlan']}
#                                         WHERE PracovnikID = \'{name}\' AND ((Tyden >= {self.start} AND Rok = {self.start_year}) OR (Tyden <= {self.end} AND Rok = {self.end_year}))''')
#             for row in query:
#                 result[row[0]] = row[1]
#             data[name] = result.copy()
#         return data
#
#
#     def get_data_for_edit(self):
#         data = []
#         result = {}
#         query = self.cursor.execute(f'''SELECT [PracovnikID], [Tyden] ,[ProjektId] ,[ZakazkaId] ,[Planovano]
#                                     FROM {self.data_resources['realVsPlan']}
#                                     WHERE ((Tyden >= {self.start} AND Rok = {self.start_year}) OR (Tyden <= {self.end} AND Rok = {self.end_year}))''')
#         for row in query:
#             try:
#                 result[row[0]]
#             except KeyError:
#                 result[row[0]] = []
#             finally:
#                 result[row[0]].append({"tyden": row[1], "projektId": row[2], "zakazkaId": row[3], "planovano": row[4]})
#         return result
#
#
#     def return_data_for_edit(self, data, user_id):
#         result = {}
#         planovano = {}
#         table = data
#         for i in range(len(self.weeks)):
#             planovano[self.weeks[i]] = ""
#         for row in table[user_id]:
#             try:
#                 result[row["projektId"]]
#             except KeyError:
#                 result[row["projektId"]] = planovano.copy()
#         for row in table[user_id]:
#             result[row["projektId"]][row["tyden"]] = row["planovano"]
#         return result
