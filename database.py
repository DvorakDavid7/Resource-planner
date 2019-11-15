import pyodbc
from app_config import CONECTION_STRING
from datetime import datetime, timedelta, date
import calendar
import operator


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
            "ProjektySeznam": "[dbo].[View_ResourcePlanner_ProjektySeznam]",
            "PrilezitostiSeznam": "[dbo].[View_ResourcePlanner_PrilezitostiSeznam]",
            "PracovnikPlan": "[dbo].[PracovnikPlan]",
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



class DataConvertor():
    '''takes data from SQl object, combine it and return appropriate JSON'''
    def __init__(self):
        self.sql = SQL()
        self.weeks = []

    def user_id_to_name(self, department):
        result = {}
        name_list = self.sql.read_Department(department)
        for row in name_list:
            result[row[0]] = row[2]
        result = dict(sorted(result.items(), key=operator.itemgetter(1)))
        return result


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
            result[user_id] = plan.copy()
        result = dict(sorted(result.items()))
        return result


    def edit_plan_projects_data(self, user_id):
        result = {}
        plan = {}
        worker_plan_table = self.sql.read_WorkerPlan(user_id)
        for week in self.weeks:
            plan[week] = ""
        for row in worker_plan_table:
            if row[1] != None:
                try:
                    result[row[1]]
                except KeyError:
                    result[row[1]] = plan.copy()
                finally:
                    result[row[1]][row[3]] = row[4]
        # replace project id with project name
        for project_id in list(result.keys()):
            project_name = self.sql.read_projects(project_id)[0][0] + " (" + self.sql.read_projects(project_id)[0][1] + ")"
            result[project_name] = result.pop(project_id)
        return result



    def edit_plan_opportunity_data(self, user_id):
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
        # replace opportunity id with opportunity name
        for opportunity_id in list(result.keys()):
            try:
                opportunity_name = self.sql.read_opportunity(opportunity_id)[0][0] + " (" + self.sql.read_opportunity(opportunity_id)[0][1] +")"
                opportunity_status = self.sql.read_opportunity(opportunity_id)[0][2]
            except:
                opportunity_name = "nedefinováno"
                opportunity_status = 3
            result[opportunity_name] = {"status": opportunity_status,"plan": result.pop(opportunity_id)}
        return result




class DataHolder():
    def __init__(self):
        self.dataConvertor = DataConvertor()
        self.weeks = self.dataConvertor.weeks

    def load_table_header(self):
        return self.dataConvertor.table_header_data()

    def load_data_for_work_summary(self, department):
        self.names = self.dataConvertor.user_id_to_name(department).copy()
        return self.dataConvertor.work_summary_data(department)

    def load_data_for_edit(self, user_id):
        self.projects = self.dataConvertor.edit_plan_projects_data(user_id)
        self.opportunity = self.dataConvertor.edit_plan_opportunity_data(user_id)



class Table():
    def __init__(self):
        self.dataHolder = DataHolder()
        self.weeks = self.dataHolder.weeks

    def load_header(self):
        table_header = self.dataHolder.load_table_header()
        self.header_columns = list(table_header.keys())
        self.header_content = table_header

    def load_content_overview(self):
        work_summary = self.dataHolder.load_data_for_work_summary("IA")
        self.content = work_summary
        self.names = self.dataHolder.names
        self.rows = list(self.names.keys())

    def load_content_edit(self, user_id):
        self.dataHolder.load_data_for_edit(user_id)
        self.rows_projects = list(self.dataHolder.projects.keys())
        self.content_projects = self.dataHolder.projects

        self.rows_opportunity = list(self.dataHolder.opportunity.keys())
        self.content_opportunity = self.dataHolder.opportunity

        self.sum = []
        for week in self.weeks:
            tmp = 0
            for row in self.rows_projects:
                if self.content_projects[row][week] != "":
                    tmp += int(self.content_projects[row][week])

            for row in self.rows_opportunity:
                if self.content_opportunity[row]["plan"][week] != "" and self.content_opportunity[row]["status"] != 2:
                     tmp += int(self.content_opportunity[row]["plan"][week])
            self.sum.append(tmp)


# x = Table()
# x.load_header()
# x.load_content_edit("jadam")


# x = DataConvertor()
# print(x.edit_plan_opportunity_data("jadam"))
