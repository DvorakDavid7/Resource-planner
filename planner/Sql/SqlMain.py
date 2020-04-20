from app_config import CONNECTION_STRING
import pypyodbc


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
        }

    def connect_to_database(self):
        try:
            self.connection = pypyodbc.connect(CONNECTION_STRING)
            self.cursor = self.connection.cursor()
            return True
        except pypyodbc.Error as err:
            print(f"Connection Error: {err}")
            return False
