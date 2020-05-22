from typing import List
from planner.Sql.SqlMain import SqlMain


class ProjectTable(SqlMain):
 
    DATA_RESOURCE = "[dbo].[View_ResourcePlanner_ZakazkySeznamCRM]"

    def __init__(self) -> None:
        super().__init__()
        super().connect_to_database()
        self.cid: List[str] = []
        self.projectFullName: List[str] = []
        self.pmFullName: List[str] = []
        self.dmFullName: List[str] = []  

    def get_project_details(self, cid: str) -> None:
        query = f'''SELECT TOP(1) [CID+NazevZakazkyCRM], [ProjektovyManazerJmeno]
                FROM {self.DATA_RESOURCE} WHERE ZakazkaID = '{cid}'
                '''
        table = self.cursor.execute(query)
        for row in table:
            self.projectFullName.append(row[0])
            self.pmFullName.append(row[1])
    
    def get_project_list(self) -> None:
        query = f'''SELECT TOP (50) [ZakazkaID], [CID+NazevZakazkyCRM], [ProjektovyManazerJmeno], [DeliveryManazerJmeno]
                FROM {self.DATA_RESOURCE}
                '''
        table = self.cursor.execute(query)
        for row in table:
            self.cid.append(row[0])
            self.projectFullName.append(row[1])
            self.pmFullName.append(row[2])
            self.dmFullName.append(row[3])

    def __str__(self) -> str:
        return f"cid: {self.cid}\nprojectFullName: {self.projectFullName}\npmFullName: {self.pmFullName}\ndmFullName: {self.dmFullName}"



class OpportunityTable(SqlMain):
 
    DATA_RESOURCE = "[dbo].[View_ResourcePlanner_PrilezitostiSeznam]"   

    def __init__(self) -> None:
        super().__init__()
        super().connect_to_database()
        self.cid: List[str] = []
        self.opportunityFullName: List[str] = []
        self.pmFullName: List[str] = []
        self.status: List[str] = []

    def get_opportunity_details(self, cid: str) -> None:
        query = f'''SELECT [CID+Nazev], [ProjektovyManazerJmeno]
            FROM {self.DATA_RESOURCE}
            WHERE ZakazkaID = '{cid}'
            '''
        table = self.cursor.execute(query)
        for row in table:
            self.opportunityFullName.append(row[0])
            self.pmFullName.append(row[1])
    
    def get_opportunity_list(self) -> None:
        query = f'''SELECT [ZakazkaID], [CID+Nazev], [ProjektovyManazerJmeno]
                FROM {self.DATA_RESOURCE} WHERE Status = 0'''

        table = self.cursor.execute(query)
        for row in table:
            self.cid.append(row[0])
            self.opportunityFullName.append(row[1])
            self.pmFullName.append(row[2])

    def __str__(self) -> str:
        return f"cid: {self.cid}\nopportunityFullName: {self.opportunityFullName}\npmFullName: {self.pmFullName}\nstatus: {self.status}"
