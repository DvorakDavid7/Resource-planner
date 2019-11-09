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
        year_start = self.get_range(range * 7)[0][:4]
        year_end = self.get_range(range * 7)[1][:4]
        week_start = self.day_to_week_number(self.get_range(range * 7)[0])
        week_end = self.day_to_week_number(self.get_range(range * 7)[1])
        return {"week_start": week_start, "year_start": year_start, "week_end": week_end, "year_end": year_end}

class DataHolder(DateManager):
    """compliting data from database."""

    def __init__(self):
        super().__init__()
        self.cnxn = pyodbc.connect(CONECTION_STRING)
        self.cursor = self.cnxn.cursor()


    def get_datum(self):
        return self.cursor.execute('SELECT * FROM [dbo].[Datum]')


    def day_range(self, range):
        data = []
        wr = self.week_range(range)
        year_star = wr["year_start"]
        start = wr["week_start"]
        year_end = wr["year_end"]
        end = wr["week_end"]

        query = self.cursor.execute(f"SELECT * FROM [dbo].[View_ResourcePlanner_DatumTyden] WHERE Tyden BETWEEN '{year_star}-{start}' AND '{year_end}-{end}'")

        for row in query:
            data.append([row[1], row[2].replace("(", "").replace(")", "")])
        return data

    def name_list(self, week_od, week_do, department):
        name_list=  []
        query = self.cursor.execute(f"SELECT DISTINCT [PracovnikID] FROM [dbo].[View_ResourcePlanner_WorkerSummaryPlan] WHERE Tyden BETWEEN {week_od} AND {week_do} AND OddeleniID = '{department}'")
        for row in query:
            name_list.append(row[0])
        return name_list

    def work_summary(self, week_od, week_do, department):
        name_list = self.name_list(week_od, week_do, department)
        data = {}
        result = {}
        result_copy = {}

        for name in name_list:
            for i in range(week_od, week_do + 1):
                result[i] = ""

            query = self.cursor.execute(f"SELECT [Tyden], [Plan] FROM [dbo].[View_ResourcePlanner_WorkerSummaryPlan] WHERE PracovnikID = '{name}' AND Tyden BETWEEN {week_od} AND {week_do} AND Rok = 2019")
            for row in query:
                result[row[0]] = row[1]

            result_copy = result.copy()
            data[name] = result_copy
        return data


    def edit_plan(self, user_id, week_od, week_do):
        planovano = {}
        zakazkaID = []
        result = {}
        result[user_id] = {}
        planovano_copy = {}


        query = self.cursor.execute(f"SELECT DISTINCT [ZakazkaId] FROM [dbo].[View_ResourcePlanner_RealVsPlan] WHERE PracovnikID = '{user_id}' and Rok = 2019 and Tyden between {week_od} and {week_do}")
        for row in query:
            zakazkaID.append(row[0])

        zakazkaID = zakazkaID[1:]
        for zakazka in zakazkaID:
            for i in range(week_od, week_do + 1):
                planovano[i] = ""

            query2 = self.cursor.execute(f"SELECT DISTINCT [Tyden], [Planovano] FROM [dbo].[View_ResourcePlanner_RealVsPlan] WHERE ZakazkaId = '{zakazka}' AND PracovnikID = '{user_id}' and Rok = 2019 and Tyden between {week_od} and {week_do}")
            for row in query2:
                planovano[row[0]] = row[1]
            planovano_copy = planovano.copy()
            result[user_id][zakazka] = planovano_copy

        return result

# x = DataHolder()
# print(x.edit_plan("akolarik", 40, 50)["akolarik"])
