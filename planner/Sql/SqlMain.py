import pypyodbc
from flask import current_app
from app_config import DevConfig

class SqlMain:
    def __init__(self):
        self.connection = None
        self.cursor = None
        # "[dbo].[PracovnikPlan]","[dbo].[PracovnikPlan_TEST]"
        self.data_resources = {
            "date_week": "[dbo].[View_ResourcePlanner_DatumTyden]",
            "name_list": "[dbo].[View_ResourcePlanner_Department]",
            "summary_plan": "[dbo].[View_ResourcePlanner_WorkerSummaryPlan]",
            "worker_plan": "[dbo].[PracovnikPlan_TEST]",
            "entry": "[dbo].[PracovnikPlan_TEST]",
            "project_list": "[dbo].[View_ResourcePlanner_ProjektySeznam]",
            "opportunity_list": "[dbo].[View_ResourcePlanner_PrilezitostiSeznam]",

            "phases": "[dbo].[View_ResourcePlanner_Projekty_Faze_Seznam]",
            "projects_workers": "[dbo].[View_ResourcePlanner_Projekty_Pracovnik_Seznam]",
            "pracovnik_plan_ftfp": "[dbo].[PracovnikPlanFtfp]"
        }

    def connect_to_database(self) -> None:
        try:
            self.connection = pypyodbc.connect(current_app.config["CONNECTION_STRING"])
            # self.connection = pypyodbc.connect(DevConfig.CONNECTION_STRING)
            self.cursor = self.connection.cursor()
        except pypyodbc.Error as err:
            print(f"Connection Error: {err}")