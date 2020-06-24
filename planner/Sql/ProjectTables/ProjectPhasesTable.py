from typing import List
from planner.Sql.SqlMain import SqlMain


class ProjecPhasesTable(SqlMain):
 
    DATA_RESOURCE = "[dbo].[View_ResourcePlanner_Projekty_Faze_Seznam]"

    def __init__(self) -> None:
        super().__init__()
        super().connect_to_database()

        self.projectId: List[str] = []
        self.phaseId: List[str] = []
        self.phaseName: List[str] = []
        self.plannedWork: List[str] = []

    def get_phases(self, projectId: str) -> None:
        query = f'''SELECT [ProjektID], [FazeID], [FazeNazev], [PlanovanaPracnost]
                FROM {ProjecPhasesTable.DATA_RESOURCE} WHERE ProjektID = {projectId} AND Status = 'active'
                '''
        table = self.cursor.execute(query)
        for row in table:
            self.projectId.append(row[0])
            self.phaseId.append(row[1])
            self.phaseName.append(row[2])
            self.plannedWork.append(row[3])

    def __str__(self) -> str:
        return f"projectId: {self.projectId}\nphaseId: {self.phaseId}\nphaseName: {self.phaseName}\nplannedWork: {self.plannedWork}"

