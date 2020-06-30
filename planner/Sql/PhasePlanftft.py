from typing import List
from planner.Sql.SqlMain import SqlMain


class PhasePlanftft(SqlMain):
 
    DATA_RESOURCE = "[dbo].[FazePlanFtfp]"

    def __init__(self) -> None:
        super().__init__()
        super().connect_to_database()

        self.amount: List[str] = []
        self.phaseId: List[str] = []

    
    def insertRow(self, cid: str, projectId: str, phaseId: str, amount: str, modifiedBy: str):
        query = f'''INSERT INTO {self.DATA_RESOURCE} (ZakazkaID, ProjektID, FazeID, Castka, ModifiedBy) 
            VALUES ('{cid}', {projectId}, {phaseId}, {amount}, '{modifiedBy}')'''
        self.cursor.execute(query)
        self.connection.commit()


    def deleteRow(self, cid: str, projectId: str, phaseId: str):
        query = f'''DELETE FROM {self.DATA_RESOURCE} WHERE ZakazkaID = '{cid}' AND ProjektID = {projectId} AND FazeID = {phaseId}'''
        self.cursor.execute(query)
        self.connection.commit()


    def get_values(self, projectId: str):
        query = f'''SELECT [Castka], [FazeID]
            FROM {self.DATA_RESOURCE} WHERE ProjektID = {projectId}'''
        table = self.cursor.execute(query)
        for row in table:
            self.amount.append(str(row[0]))
            self.phaseId.append(str(row[1]))
