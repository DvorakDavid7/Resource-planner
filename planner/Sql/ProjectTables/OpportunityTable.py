from typing import List
from planner.Sql.SqlMain import SqlMain

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
        query = f'''SELECT [CID+Nazev], [ProjektovyManazerJmeno], [status]
            FROM {self.DATA_RESOURCE}
            WHERE ZakazkaID = '{cid}'
            '''
        table = self.cursor.execute(query)
        for row in table:
            self.opportunityFullName.append(row[0])
            self.pmFullName.append(row[1])
            self.status.append(row[2])

    def get_opportunity_list(self) -> None:
        query = f'''SELECT [ZakazkaID], [CID+Nazev], [ProjektovyManazerJmeno], [status]
                FROM {self.DATA_RESOURCE} WHERE Status = 0'''
        table = self.cursor.execute(query)
        for row in table:
            self.cid.append(row[0])
            self.opportunityFullName.append(row[1])
            self.pmFullName.append(row[2])
            self.status.append(row[3])

    def clearTable(self):
        self.cid = []
        self.opportunityFullName = []
        self.pmFullName = []
        self.status = []

    def __str__(self) -> str:
        return f"cid: {self.cid}\nopportunityFullName: {self.opportunityFullName}\npmFullName: {self.pmFullName}\nstatus: {self.status}"
