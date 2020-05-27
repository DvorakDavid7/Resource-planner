from typing import List
from planner.Sql.SqlMain import SqlMain


class ProjectWorkersTable(SqlMain):
 
    DATA_RESOURCE = "[dbo].[View_ResourcePlanner_Projekty_Pracovnik_Seznam]"

    projectId: List[str] = []
    workerId: List[str] = []
    workerFullName: List[str] = []
    roleId: List[str] = []
    roleName: List[str] = []       

    def __init__(self) -> None:
        super().__init__()
        super().connect_to_database()


    def get_project_workers(self, projectId: str) -> None:
        query = f'''SELECT [ProjektID], [PracovnikID], [PracovnikCeleJmeno], [RoleID], [RoleNazev]
                FROM {ProjectWorkersTable.DATA_RESOURCE} WHERE ProjektID = {projectId}'''
        table = self.cursor.execute(query)
        for row in table:
            self.projectId.append(row[0])
            self.workerId.append(row[1])
            self.workerFullName.append(row[2])
            self.roleId.append(row[3])
            self.roleName.append(row[4])

        
    def __str__(self) -> str:
        return f"projectId: {self.projectId}\nworkerId: {self.workerId}\nworkerFullName: {self.workerFullName}\nroleId: {self.roleId}\nroleName: {self.roleName}"

