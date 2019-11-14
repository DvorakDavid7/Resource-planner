import pyodbc
from app_config import CONECTION_STRING
from datetime import datetime, timedelta, date
import calendar


class DateManager():
    def __init__(self):
        self.current_day = date(2019, 5, 15)  # date.today()

    @staticmethod
    def day_to_week_number(datestring):
        day = datestring                        #  '07.11.2019'
        dt = datetime.strptime(day, '%Y-%m-%d')
        wk = dt.isocalendar()[1]
        return wk

    def get_range(self, range):
        date_start = str(self.current_day - timedelta(days=range))
        date_end = str(self.current_day + timedelta(days=range))
        return [date_start, date_end]

    def week_range(self, range):
        get_range = self.get_range(range * 7)
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


class Table():
    def __init__(self, json_object):
        self.dataConvertor = DataConvertor()

        self.content = json_object
        self.rows = list(json_object.keys())

        self.columns_range = {}
        self.columns_range["start"] = self.dataConvertor.start
        self.columns_range["end"] = self.dataConvertor.end

        self.head = {"week_numbers":  [], "content": {}}

        self.head["week_numbers"] = list(self.dataConvertor.table_header_data["content"].keys())
        self.head["content"] = self.dataConvertor.table_header_data["content"]



class DataConvertor():
    """compliting data from database."""

    def __init__(self):
        self.cnxn = pyodbc.connect(CONECTION_STRING)
        self.cursor = self.cnxn.cursor()
        self.data_resources = {
            "datumTyden": "[dbo].[View_ResourcePlanner_DatumTyden]",
            "workerPlan": "[dbo].[View_ResourcePlanner_WorkerSummaryPlan]",
            "realVsPlan": "[dbo].[View_ResourcePlanner_RealVsPlan]",
        }

        self.dateManager = DateManager()
        self.table_header_data = self.get_table_header_data(5)
        self.start = int(self.table_header_data["range"][0])
        self.end = int(self.table_header_data["range"][1])


    def get_table_header_data(self, range):
        data = []
        result = {}
        wr = self.dateManager.week_range(range)
        year_star = wr["year_start"]; start = wr["week_start"]; year_end = wr["year_end"]; end = wr["week_end"]
        query = self.cursor.execute(f'''SELECT * FROM {self.data_resources['datumTyden']}
                                    WHERE Tyden BETWEEN \'{year_star}-{start}\' AND \'{year_end}-{end}\'''')
        for row in query:
            data.append([row[1], row[2].replace("(", "").replace(")", "")])
        for record in data:
            result[record[0][5:]] = record[1]

        return {"range":[wr["week_start"], wr["week_end"]] ,"content":result}


    def get_name_list_for_work_summary(self, department):
        name_list=  []
        query = self.cursor.execute(f'''SELECT DISTINCT [PracovnikID]
                                    FROM {self.data_resources['workerPlan']}
                                    WHERE Tyden BETWEEN {self.start} AND {self.end} AND OddeleniID = \'{department}\'''')
        for row in query:
            name_list.append(row[0])
        return name_list


    def get_work_summary_data(self, department):
        name_list = self.get_name_list_for_work_summary(department)
        data = {}
        result = {}
        for name in name_list:
            for i in range(self.start, self.end + 1):
                result[i] = ""
            query = self.cursor.execute(f'''SELECT [Tyden], [Plan]
                                        FROM {self.data_resources['workerPlan']}
                                        WHERE PracovnikID = '{name}' AND Tyden BETWEEN {self.start} AND {self.end} AND Rok = 2019''')
            for row in query:
                result[row[0]] = row[1]
            data[name] = result.copy()

        return data


    def get_data_for_edit(self):
        data = []
        result = {}
        query = self.cursor.execute(f'''SELECT [PracovnikID], [Tyden] ,[ProjektId] ,[ZakazkaId] ,[Planovano]
                                    FROM {self.data_resources['realVsPlan']}
                                    WHERE Tyden BETWEEN {self.start} AND {self.end}''')
        for row in query:
            try:
                result[row[0]]
            except KeyError:
                result[row[0]] = []
            finally:
                result[row[0]].append({"tyden": row[1], "projektId": row[2], "zakazkaId": row[3], "planovano": row[4]})
        return result


    def return_data_for_edit(self, data, user_id):
        result = {}
        planovano = {}
        table = data
        for i in range(self.week_od, self.week_do):
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


# x = DataConvertor()
# # x.week_start_end()
#
#
# work_summary_data = x.get_work_summary_data("IA")
# table = Table(work_summary_data)
