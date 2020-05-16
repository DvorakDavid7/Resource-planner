from typing import List
from planner.Sql.SqlMain import SqlMain


class WorkerTable(SqlMain):
 
    DATA_RESOURCE = "[dbo].[Pracovnik]"
    
    name: List[str] = []
    surname: List[str] = []

    def __init__(self) -> None:
        super().__init__()
        super().connect_to_database()

    def get_user_full_name(self, workerId: str) -> None:
        query = f'''SELECT [Jmeno], [Prijmeni] FROM {self.DATA_RESOURCE} 
                    WHERE PracovnikID = '{workerId}'
                '''
        table = self.cursor.execute(query)
        for row in table:
            self.name.append(row[0])
            self.surname.append(row[1])


    def __str__(self) -> str:
        return f'''name: {self.name}\nsurname: {self.surname}\n'''
