import pyodbc
from app_config import CONECTION_STRING
from datetime import datetime, timedelta, date
import calendar


class DateManager():
    def __init__(self):
        pass

    @staticmethod
    def day_to_week_number(datestring):
        day = datestring                        #  '07.11.2019'
        dt = datetime.strptime(day, '%Y-%m-%d')
        wk = dt.isocalendar()[1]
        return wk

    @staticmethod
    def get_range(range):
        current_day = date.today()
        date_start = str(current_day - timedelta(days=range))
        date_end = str(current_day + timedelta(days=range))
        return [date_start, date_end]


    def week_range(self, range):
        get_range =  self.get_range(range * 7)
        year_start = get_range[0][:4]
        year_end = get_range[1][:4]
        week_start = self.day_to_week_number(get_range[0])
        week_end = self.day_to_week_number(get_range[1])
        return {"week_start": week_start, "year_start": year_start, "week_end": week_end, "year_end": year_end}


class Table():
    def __init__(self, json_object, col_start, col_end):
        self.dataConvertor = DataConvertor()
        self.complete_header()
        self.content = json_object
        self.rows = list(json_object.keys())
        self.columns_range = {"start": col_start, "end": col_end}

    def complete_header(self):
        self.head = {"week_numbers":  [], "content": {}}
        table_head_content = self.dataConvertor.get_table_header_data(5)
        self.head["week_numbers"] = list(table_head_content.keys())
        self.head["content"] = table_head_content


class DataConvertor():
    """compliting data from database."""

    def __init__(self):
        self.dataManager = DateManager()
        self.cnxn = pyodbc.connect(CONECTION_STRING)
        self.cursor = self.cnxn.cursor()
        # self.json_table = self.get_data_for_edit(41, 51)


    def get_table_header_data(self, range):
        data = []
        result = {}
        wr = self.dataManager.week_range(range)
        year_star = wr["year_start"]; start = wr["week_start"]; year_end = wr["year_end"]; end = wr["week_end"]
        query = self.cursor.execute(f"SELECT * FROM [dbo].[View_ResourcePlanner_DatumTyden] WHERE Tyden BETWEEN '{year_star}-{start}' AND '{year_end}-{end}'")
        for row in query:
            data.append([row[1], row[2].replace("(", "").replace(")", "")])
        for record in data:
            result[record[0][5:]] = record[1]
        return result


    def get_name_list_for_work_summary(self, week_od, week_do, department):
        name_list=  []
        query = self.cursor.execute(f"SELECT DISTINCT [PracovnikID] FROM [dbo].[View_ResourcePlanner_WorkerSummaryPlan] WHERE Tyden BETWEEN {week_od} AND {week_do} AND OddeleniID = '{department}'")
        for row in query:
            name_list.append(row[0])
        return name_list


    def get_work_summary_data(self, week_od, week_do, department):
        name_list = self.get_name_list_for_work_summary(week_od, week_do, department)
        data = {}
        result = {}

        for name in name_list:
            for i in range(week_od, week_do + 1):
                result[i] = ""

            query = self.cursor.execute(f"SELECT [Tyden], [Plan] FROM [dbo].[View_ResourcePlanner_WorkerSummaryPlan] WHERE PracovnikID = '{name}' AND Tyden BETWEEN {week_od} AND {week_do} AND Rok = 2019")
            for row in query:
                result[row[0]] = row[1]

            data[name] = result.copy()
        return data


    def get_data_for_edit(self, week_od, week_do):
        data = []
        result = {}
        query = self.cursor.execute(f"SELECT [PracovnikID], [Tyden] ,[ProjektId] ,[ZakazkaId] ,[Planovano] FROM [dbo].[View_ResourcePlanner_RealVsPlan] WHERE Tyden BETWEEN {week_od} AND {week_do}")
        for row in query:
            try:
                result[row[0]]
            except KeyError:
                result[row[0]] = []
            finally:
                result[row[0]].append({"tyden": row[1], "projektId": row[2], "zakazkaId": row[3], "planovano": row[4]})
        return result


    def return_data_for_edit(self, data, user_id, week_od, week_do):
        result = {}
        planovano = {}
        table = data

        for i in range(41, 52):
            planovano[i] = ""

        for row in table[user_id]:
            try:
                result[row["projektId"]]
            except KeyError:
                result[row["projektId"]] = planovano.copy()

        for row in table[user_id]:
            result[row["projektId"]][row["tyden"]] = row["planovano"]

        return result


class DataHolder():
    def __init__(self):
        pass
        
    def load_data_for_edit(self):
        dataConvertor = DataConvertor()
        self.data_for_edit = dataConvertor.get_data_for_edit(41, 51)



# x = DataHolder()
# print(x.return_data_for_edit("akolarik", 41, 51))
