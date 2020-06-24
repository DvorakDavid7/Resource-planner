from typing import List
from planner.Sql.SqlMain import SqlMain


class ProjectTable(SqlMain):

    DATA_RESOURCE = "[dbo].[View_ResourcePlanner_ProjektySeznam]"

    def __init__(self) -> None:
        super().__init__()
        super().connect_to_database()

        self.projectID: List[str] = []
        self.cid: List[str] = []
        self.fullName: List[str] = []
        self.projectManager: List[str] = []
        self.deliveryManager: List[str] = []
        self.amountTotal: List[str] = []
        self.estimate: List[str] = []

    
    def get_projectList(self) -> None:
        query = f'''SELECT [ProjektID],[ZakazkaID],[CID+Nazev],[ProjektovyManazerJmeno],[DeliveryManazerJmeno],[CastkaCelkem],[PlanovanaPracnost] FROM {self.DATA_RESOURCE}
        '''
        table = self.cursor.execute(query)
        for row in table:
            self.projectID.append(str(row[0]))
            self.cid.append(str(row[1]))
            self.fullName.append(str(row[2]))
            self.projectManager.append(str(row[3]))
            self.deliveryManager.append(str(row[4]))
            self.amountTotal.append(str(row[5]))
            self.estimate.append(str(row[6]))
    

    def get_projectInfo(self, projectId: str) -> None:
        query = f'''SELECT [ProjektID],[ZakazkaID],[CID+Nazev],[ProjektovyManazerJmeno], 
        [DeliveryManazerJmeno],[CastkaCelkem],[PlanovanaPracnost]
        FROM {self.DATA_RESOURCE} WHERE ProjektID = {projectId}
        '''
        table = self.cursor.execute(query)
        for row in table:
            self.projectID.append(str(row[0]))
            self.cid.append(str(row[1]))
            self.fullName.append(str(row[2]))
            self.projectManager.append(str(row[3]))
            self.deliveryManager.append(str(row[4]))
            self.amountTotal.append(str(row[5]))
            self.estimate.append(str(row[6]))
