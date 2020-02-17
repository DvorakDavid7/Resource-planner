from planner.Sql.SqlMain import SqlMain


class SqlRead(SqlMain):
    def __init__(self):
        super().__init__()
        super().connect_to_database()

    def read_date_week(self, year_start: str, week_start: str, year_end: str, week_end: str) -> []:
        data = []
        if len(week_start) == 1:
            week_start = "0" + week_start
        if len(week_end) == 1:
            week_end = "0" + week_end
        query = f'''SELECT [Tyden], [TydenFormat], [PocetHodin] FROM {self.data_resources['date_week']}
                       WHERE Tyden BETWEEN \'{year_start}-{week_start}\' AND \'{year_end}-{week_end}\''''
        rows = self.cursor.execute(query).fetchall()
        for row in rows:
            week = row[0].split("-")[1]
            begin_end_dates = row[1].replace("(", "").replace(")", "")
            working_hours = str(row[2])
            data.append((week, begin_end_dates, working_hours))
        return data

    def read_department(self, department: str) -> []:
        data = []
        if len(department) == 2:
            parameter = f"OddeleniID = \'{department}\'"
        else:
            parameter = f"OddeleniID IN {department}"
        query = f'''SELECT DISTINCT [PracovnikID], [OddeleniID], [CeleJmeno] FROM {self.data_resources['name_list']}
                WHERE {parameter} ORDER BY ([CeleJmeno])'''
        table = self.cursor.execute(query)
        for row in table:
            data.append(row)
        return data

    def read_worker_summary_plan(self, name, year_start, week_start, year_end, week_end) -> []:
        data = []
        if year_start == year_end:
            condition = f"Rok = {year_start} AND Tyden BETWEEN {week_start} AND {week_end}"
        else:
            condition = f"((Tyden >= {week_start} AND Rok = {year_start}) OR (Tyden <= {week_end} AND Rok = {year_end}))"
        query = f'''SELECT [Tyden], [Plan] FROM {self.data_resources["summary_plan"]}
                WHERE PracovnikID = \'{name}\' AND {condition}'''
        table = self.cursor.execute(query)
        for row in table:
            data.append(row)
        return data

    def read_worker_plan(self, data_for, user_id, year_start, week_start, year_end, week_end) -> []:
        data = []
        if data_for == "project":
            parameter = "ZakazkaID IS NULL"
            task_row = "[ProjektID]"
        else:
            parameter = "ProjektID IS NULL"
            task_row = "[ZakazkaID]"
        if year_start == year_end:
            condition = f"Tyden BETWEEN {week_start} AND {week_end} AND Rok = {year_start}"
        else:
            condition = f"((Tyden >= {week_start} AND Rok = {year_start}) OR (Tyden <= {week_end} AND Rok = {year_end}))"
        query = f'''SELECT {task_row}, [Tyden], [PlanHod]
                FROM {self.data_resources["worker_plan"]}
                WHERE {parameter} AND PracovnikID = \'{user_id}\' AND {condition}'''
        table = self.cursor.execute(query)
        for row in table:
            data.append(row)
        return data

    def read_edit_data_details(self, data_for, identifier) -> []:
        data = []
        if data_for == "project":
            query = f'''SELECT [CID+Nazev], [ProjektovyManazerJmeno]
                    FROM {self.data_resources["project_list"]}
                    WHERE ProjektID = {identifier}'''
        elif data_for == "opportunity":
            query = f'''SELECT [CID+Nazev], [ProjektovyManazerJmeno], [Status]
                    FROM {self.data_resources["opportunity_list"]}
                    WHERE ZakazkaID = \'{identifier}\''''
        else:
            return False
        table = self.cursor.execute(query)
        for row in table:
            data.append(row)
        return data

    def read_project_list(self, data_for):
        data = []
        if data_for == "project":
            resource = self.data_resources["project_list"]
            condition = "Status = \'active\'"
        else:
            resource = self.data_resources["opportunity_list"]
            condition = "Status = 0"
        query = f'''SELECT [ProjektID] ,[ZakazkaID] ,[CID+Nazev], [ProjektovyManazerJmeno] 
                FROM {resource} WHERE {condition}'''
        table = self.cursor.execute(query)
        for row in table:
            data.append(row)
        return data

    def read_user_details(self, user_id):
        data = []
        query = f'''SELECT [OddeleniID] ,[CeleJmeno] FROM {self.data_resources["name_list"]} WHERE
                PracovnikID = \'{user_id}\''''
        table = self.cursor.execute(query)
        for row in table:
            data.append(row)
        return data
