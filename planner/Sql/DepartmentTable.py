from typing import List
from planner.Sql.SqlMain import SqlMain


class DepartmentTable(SqlMain):
 
    DATA_RESOURCE = "[dbo].[View_ResourcePlanner_Department]"

    def __init__(self) -> None:
        super().__init__()
        super().connect_to_database()

        self.workerId: List[str] = []
        self.department: List[str] = []
        self.fullName: List[str] = []

    def get_workers_names(self, department: str) -> None:
        condition = f"OddeleniID = '{department}'" if len(department) == 2 else f"OddeleniID IN {department}" 

        query = f'''SELECT DISTINCT [PracovnikID], [OddeleniID], [CeleJmeno] FROM {self.DATA_RESOURCE}
                WHERE {condition} ORDER BY ([CeleJmeno])'''
        
        table = self.cursor.execute(query)
        for row in table:
            self.workerId.append(row[0])
            self.department.append(row[1])
            self.fullName.append(row[2])
    
    def get_user_details(self, workerId: str) -> None:  # DONE
        query = f'''SELECT [OddeleniID] ,[CeleJmeno] FROM {DepartmentTable.DATA_RESOURCE} WHERE
                PracovnikID = '{workerId}'
                '''
        table = self.cursor.execute(query)
        for row in table:
            self.department.append(row[0])
            self.fullName.append(row[1])

    def __str__(self) -> str:
        return f'''workerId: {self.workerId}\ndepartment: {self.department}\nworkerFullName: {self.fullName}'''

