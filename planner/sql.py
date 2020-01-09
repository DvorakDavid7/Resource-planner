import pypyodbc

from app_config import CONNECTION_STRING


class SQL:
    '''write and read data from database'''
    def __init__(self):
        self.cnxn = pypyodbc.connect(CONNECTION_STRING)
        self.cursor = self.cnxn.cursor()
        self.data_resources = {
            "datumTyden": "[dbo].[View_ResourcePlanner_DatumTyden]",
            "NameList": "[dbo].[View_ResourcePlanner_Department]",
            "SummaryPlan": "[dbo].[View_ResourcePlanner_WorkerSummaryPlan]",
            "ProjektySeznam": "[dbo].[View_ResourcePlanner_ProjektySeznam]",
            "PrilezitostiSeznam": "[dbo].[View_ResourcePlanner_PrilezitostiSeznam]",
            # "PracovnikPlan": "[dbo].[PracovnikPlan]",
            "PracovnikPlan": "[dbo].[PracovnikPlan_TEST]",
            "Zapis": "[dbo].[PracovnikPlan_TEST]",
            # "Zapis": "[dbo].[PracovnikPlan]",
        }

    def connect_to_database(self):
        self.cnxn = pypyodbc.connect(CONNECTION_STRING)
        self.cursor = self.cnxn.cursor()

    def read_DatumTyden(self, year_start, week_start, year_end, week_end):
        data = []
        query = f'''SELECT [Tyden], [TydenFormat], [PocetHodin] FROM {self.data_resources['datumTyden']}
                WHERE Tyden BETWEEN \'{year_start}-{week_start}\' AND \'{year_end}-{week_end}\''''
        table = self.cursor.execute(query)
        for row in table:
            data.append(row)
        return data  # [(x,x,x), (x,x,x), ...]

    def read_Department(self, department):  # name list from department table
        data = []
        query1 = f'''SELECT DISTINCT [PracovnikID], [OddeleniID], [CeleJmeno] FROM {self.data_resources['NameList']}
                WHERE OddeleniID IN {department}'''
        query2 = f'''SELECT DISTINCT [PracovnikID], [OddeleniID], [CeleJmeno] FROM {self.data_resources['NameList']}
                WHERE OddeleniID = \'{department}\''''

        if len(department) == 2:
            table = self.cursor.execute(query2)
        else:
            table = self.cursor.execute(query1)
        for row in table:
            data.append(row)
        return data  # [(x,x,x), (x,x,x), ...]

    def read_WorkerSummaryPlan(self, name, year_start, week_start, year_end, week_end):
        data = []
        query1 = f'''SELECT [Tyden], [Plan] FROM {self.data_resources["SummaryPlan"]}
                WHERE PracovnikID = \'{name}\' AND ((Tyden >= {week_start} AND Rok = {year_start}) OR (Tyden <= {week_end} AND Rok = {year_end}))'''
        query2 = f'''SELECT [Tyden], [Plan] FROM {self.data_resources["SummaryPlan"]}
                WHERE PracovnikID = \'{name}\' AND Rok = {year_start} AND Tyden BETWEEN {week_start} AND {week_end}'''
        if year_start == year_end:
            table = self.cursor.execute(query2)
        else:
            table = self.cursor.execute(query1)
        for row in table:
            data.append(row)
        return data  # [(x,x), (x,x), ...]

    def read_projects(self, project_id):
        data = []
        query = f'''SELECT [CID+Nazev], [ProjektovyManazerJmeno], [ZakazkaID] FROM {self.data_resources["ProjektySeznam"]}
                WHERE ProjektID = {project_id}'''
        table = self.cursor.execute(query)
        for row in table:
            data.append(row)
        return data  # [(x,x,x), (x,x,x), ...]

    def read_opportunity(self, zakazka_id):
        data = []
        query = f'''SELECT [CID+Nazev], [ProjektovyManazerJmeno], [Status], [ZakazkaID] FROM {self.data_resources["PrilezitostiSeznam"]}
                WHERE ZakazkaID = \'{zakazka_id}\''''
        table = self.cursor.execute(query)
        for row in table:
            data.append(row)
        return data  # [(x,x,x), (x,x,x), ...]


    def read_WorkerPlan(self, user_id, year_start, week_start, year_end, week_end):
        data = []
        query1 = f'''SELECT [ZakazkaID], [ProjektID], [Rok], [Tyden], [PlanHod]
                FROM {self.data_resources["PracovnikPlan"]} WHERE PracovnikID = \'{user_id}\'
                AND ((Tyden >= {week_start} AND Rok = {year_start}) OR (Tyden <= {week_end} AND Rok = {year_end}))'''

        query2 = f'''SELECT [ZakazkaID], [ProjektID], [Rok], [Tyden], [PlanHod]
                FROM {self.data_resources["PracovnikPlan"]} WHERE PracovnikID = \'{user_id}\' AND Tyden BETWEEN {week_start} AND {week_end} AND Rok = {year_start}'''
        if year_start == year_end:
            table = self.cursor.execute(query2)
        else:
            table = self.cursor.execute(query1)
        for row in table:
            data.append(row)
        return data  # [(x,x), (x,x), ...]


    def insert_row(self, PracovnikID, ZakazkaID, ProjektID, Rok, Tyden, PlanHod, ModifiedBy):
        query1 = f'''INSERT INTO {self.data_resources['Zapis']} (PracovnikID, ProjektID, Rok, Tyden, PlanHod, ModifiedBy)
                VALUES (\'{PracovnikID}\', {ProjektID}, {Rok}, {Tyden}, {PlanHod}, \'{ModifiedBy}\');'''

        query2 = f'''INSERT INTO {self.data_resources['Zapis']} (PracovnikID, ZakazkaID, Rok, Tyden, PlanHod, ModifiedBy)
                VALUES (\'{PracovnikID}\', \'{ZakazkaID}\', {Rok}, {Tyden}, {PlanHod}, \'{ModifiedBy}\');'''
        if ProjektID == "NULL":
            self.cursor.execute(query2)
        elif ZakazkaID == "NULL":
            self.cursor.execute(query1)
        self.cnxn.commit()


    def delete_row(self, PracovnikID, ZakazkaID, ProjektID, Rok, Tyden):
        query1 = f'''DELETE FROM {self.data_resources['Zapis']} WHERE
                PracovnikID = \'{PracovnikID}\' AND
                ZakazkaID IS NULL AND
                ProjektID = {ProjektID} AND
                Rok = {Rok} AND
                Tyden = {Tyden}'''
        query2 = f'''DELETE FROM {self.data_resources['Zapis']} WHERE
                PracovnikID = \'{PracovnikID}\' AND
                ZakazkaID = \'{ZakazkaID}\' AND
                ProjektID IS NULL AND
                Rok = {Rok} AND
                Tyden = {Tyden}'''
        if ProjektID == "NULL":
            self.cursor.execute(query2)
        elif ZakazkaID == "NULL":
            self.cursor.execute(query1)
        self.cnxn.commit()


    def read_project_list(self):
        data = []
        query = '''SELECT [ProjektID] ,[ZakazkaID] ,[CID+Nazev], [ProjektovyManazerJmeno] FROM [dbo].[View_ResourcePlanner_ProjektySeznam]'''
        table = self.cursor.execute(query)
        for row in table:
            data.append(row)
        return data  # [(x,x,x), (x,x,x), ...]

    def read_opportunity_list(self):
        data = []
        query = '''SELECT [ProjektID] ,[ZakazkaID] ,[CID+Nazev], [ProjektovyManazerJmeno] FROM [dbo].[View_ResourcePlanner_PrilezitostiSeznam]'''
        table = self.cursor.execute(query)
        for row in table:
            data.append(row)
        return data  # [(x,x,x), (x,x,x), ...]
