from planner.Sql.SqlMain import SqlMain


class SqlWrite(SqlMain):
    def __init__(self):
        super().__init__()
        super().connect_to_database()

    def delete_row(self, task_type, user_id, identifier, year, week):
        if task_type == "project":
            parameter = f"ZakazkaID IS NULL AND ProjektID = {identifier}"
        else:
            parameter = f"ZakazkaID = \'{identifier}\' AND ProjektID IS NULL"
        query = f'''DELETE FROM {self.data_resources['entry']} WHERE
                PracovnikID = \'{user_id}\' AND {parameter} AND Rok = {year} AND Tyden = {week}'''
        self.cursor.execute(query)
        self.connection.commit()

    def insert_row(self, task_type, user_id, identifier, year, week, planned_hours, modified_by):
        if task_type == "project":
            rows = "(PracovnikID, ProjektID, Rok, Tyden, PlanHod, ModifiedBy)"
        else:
            rows = "(PracovnikID, ZakazkaID, Rok, Tyden, PlanHod, ModifiedBy)"
            identifier = f"\'{identifier}\'"
        query = f'''INSERT INTO {self.data_resources['entry']} {rows}
                VALUES (\'{user_id}\', {identifier}, {year}, {week}, {planned_hours}, \'{modified_by}\');'''
        self.cursor.execute(query)
        self.connection.commit()

    
    def insert_row_ftfp(self, worker_id, project_id, phase_id, planned_hours, modified_by):
        query = f'''INSERT INTO {self.data_resources["pracovnik_plan_ftfp"]} (PracovnikID, ProjektID, FazeID, PlanHod, ModifiedBy)
                VALUES (\'{worker_id}\', {project_id}, {phase_id}, {planned_hours}, \'{modified_by}\');'''
        self.cursor.execute(query)
        self.connection.commit()


    def delete_row_ftfp(self, worker_id, project_id, phase):
        query = f'''DELETE FROM {self.data_resources["pracovnik_plan_ftfp"]} WHERE
                PracovnikID = \'{worker_id}\' AND ProjektID = {project_id} AND FazeID = {phase}'''
        self.cursor.execute(query)
        self.connection.commit()