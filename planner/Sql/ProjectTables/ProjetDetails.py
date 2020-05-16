from typing import List
from planner.Sql.SqlMain import SqlMain


class ProjectTable(SqlMain):
 
    DATA_RESOURCE = "[dbo].[View_ResourcePlanner_ProjektySeznam]"

    projectId: List[str] = []
    cid: List[str] = []
    projectFullName: List[str] = []
    pmFullName: List[str] = []
    dmFullName: List[str] = []  
    
    def __init__(self) -> None:
        super().__init__()
        super().connect_to_database()

    def get_project_details(self, projectId: str) -> None:
        query = f'''SELECT [CID+Nazev], [ProjektovyManazerJmeno]
                FROM {ProjectTable.DATA_RESOURCE} WHERE ProjektID = {projectId}'''
        table = self.cursor.execute(query)
        for row in table:
            self.projectFullName = row[0]
            self.pmFullName = row[1]
    
    def get_project_list(self) -> None:
        query = f'''SELECT [ProjektID], [ZakazkaID], [CID+Nazev], [ProjektovyManazerJmeno], [DeliveryManazerJmeno]
                FROM {ProjectTable.DATA_RESOURCE} WHERE Status = 'active'
                '''
        table = self.cursor.execute(query)
        for row in table:
            self.projectId.append(row[0])
            self.cid.append(row[1])
            self.projectFullName.append(row[2])
            self.pmFullName.append(row[3])
            self.dmFullName.append(row[4])

    def __str__(self) -> str:
        return f"projectId: {self.projectId}\ncid: {self.cid}\nprojectFullName: {self.projectFullName}\npmFullName: {self.pmFullName}\ndmFullName: {self.dmFullName}"


class OpportunityTable(SqlMain):
 
    DATA_RESOURCE = "[dbo].[View_ResourcePlanner_PrilezitostiSeznam]"

    def __init__(self) -> None:
        super().__init__()
        super().connect_to_database()

        self.cid: List[str] = []
        self.opportunityFullName: List[str] = []
        self.pmFullName: List[str] = []
        self.status: List[str] = []

    def get_opportunity_details(self, opportunityId: str) -> None:
        query = f'''SELECT [CID+Nazev], [ProjektovyManazerJmeno], [Status]
            FROM {OpportunityTable.DATA_RESOURCE}
            WHERE ZakazkaID = '{opportunityId}'
            '''
        table = self.cursor.execute(query)
        for row in table:
            self.opportunityFullName.append(row[0])
            self.pmFullName.append(row[1])
            self.status.append(row[2])
    
    def get_opportunity_list(self) -> None:
        query = f'''SELECT [ZakazkaID], [CID+Nazev], [ProjektovyManazerJmeno]
                FROM {OpportunityTable.DATA_RESOURCE} WHERE Status = 0'''
                
        table = self.cursor.execute(query)
        for row in table:
            self.cid.append(row[0])
            self.opportunityFullName.append(row[1])
            self.pmFullName.append(row[2])

    def __str__(self) -> str:
        return f"cid: {self.cid}\nopportunityFullName: {self.opportunityFullName}\npmFullName: {self.pmFullName}\nstatus: {self.status}"
