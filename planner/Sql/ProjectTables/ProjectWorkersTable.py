from typing import List
from planner.Sql.SqlMain import SqlMain


class ProjectWorkersTable(SqlMain):
 
    DATA_RESOURCE = "[dbo].[View_ResourcePlanner_Projekty_Pracovnik_Seznam]"      

    def __init__(self) -> None:
        super().__init__()
        super().connect_to_database()
        
        self.projectId: List[str] = []
        self.workerId: List[str] = []
        self.workerFullName: List[str] = []
        self.roleId: List[str] = []
        self.roleName: List[str] = []


    def get_project_workers(self, projectId: str) -> None:
        query = f'''SELECT [ProjektID], [PracovnikID], [PracovnikCeleJmeno], [RoleID], [RoleNazev]
                FROM {self.DATA_RESOURCE} WHERE ProjektID = {projectId}'''
        table = self.cursor.execute(query)
        for row in table:
            self.projectId.append(row[0])
            self.workerId.append(row[1])
            self.workerFullName.append(row[2])
            self.roleId.append(row[3])
            self.roleName.append(row[4])


    def get_userDetailsOnProject(self, workerId: str, projectId: str) -> None:
        query = f'''SELECT [PracovnikCeleJmeno], [RoleNazev] FROM {self.DATA_RESOURCE} WHERE PracovnikID = '{workerId}' AND ProjektID = {projectId}'''
        table = self.cursor.execute(query)
        for row in table:
            self.workerFullName.append(row[0])
            self.roleName.append(row[1])


    def clearTable(self):
        self.projectId = []
        self.workerId = []
        self.workerFullName = []
        self.roleId = []
        self.roleName = []
        
    def __str__(self) -> str:
        return f"projectId: {self.projectId}\nworkerId: {self.workerId}\nworkerFullName: {self.workerFullName}\nroleId: {self.roleId}\nroleName: {self.roleName}"




# TODO: worker id brát i z ftfp tabulky 
#       z tabulky department zjistit jestli pracuje nebo ne pokud ne zobrazit červeně 
#       Testovací CID: PO68