from typing import List
from planner.Sql.SqlMain import SqlMain


class ProjectWorkersAchievo(SqlMain):
 
    DATA_RESOURCE = "[dbo].[View_ResourcePlanner_Projekty_Pracovnik_Achievo]"

    cid: List[str] = []
    department: List[str] = []   # not implemented yet
    workerId: List[str] = []
    workerFullName: List[str] = []    

    def __init__(self) -> None:
        super().__init__()
        super().connect_to_database()


    def get_project_workers(self, cid: str) -> None:
        query = f'''SELECT [PracovnikID], [PracovnikCeleJmeno]
                FROM {self.DATA_RESOURCE} WHERE ZakazkaID = '{cid}'
                '''
        table = self.cursor.execute(query)
        for row in table:
            self.workerId.append(row[0])
            self.workerFullName.append(row[1])

        
    def __str__(self) -> str:
        return f"projectId: {self.cid}\nworkerId: {self.workerId}\nworkerFullName: {self.workerFullName}"

