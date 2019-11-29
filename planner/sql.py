import pyodbc


class SQL:
    '''write and read data from database'''
    def __init__(self):
        CONECTION_STRING = '''Driver={ODBC Driver 17 for SQL Server};
                            Server=tcp:dwhdbsrv.database.windows.net,1433;
                            Database=DWH-DB;Uid=ddvorak@trask.cz;

                            Encrypt=yes;
                            TrustServerCertificate=no;
                            Connection Timeout=30;
                            Authentication=ActiveDirectoryInteractive'''


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

    def read_DatumTyden(self, year_start, week_start, year_end, week_end):
        data = []
        query = f'''SELECT [Tyden], [TydenFormat], [PocetHodin] FROM {self.data_resources['datumTyden']}
                WHERE Tyden BETWEEN \'{year_start}-{week_start}\' AND \'{year_end}-{week_end}\''''
        table = self.cursor.execute(query)
        for row in table:
            data.append(row)
        return data  # [(x,x,x), (x,x,x), ...]


    def read_Department(self, department): # name list from department table
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


    # def read_find_record_in_database(self, PracovnikID, Rok, Tyden, ZakazkaID, ProjektID):
    #     data = []
    #     query = f'''SELECT * FROM {self.data_resources['Zapis']} WHERE Tyden = {Tyden} AND Rok = {Rok} AND PracovnikID = \'{PracovnikID}\'
    #     AND ZakazkaID = \'{ZakazkaID}\' AND ProjektID = {ProjektID}'''
    #     table = self.cursor.execute(query)
    #     for row in table:
    #         data.append(row)
    #     return data  # [(x,x,x), (x,x,x), ...]
