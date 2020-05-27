from typing import List
from planner.Models.Model import Model


class ProjectListModel(Model):
    def __init__(self):
        super().__init__()
        self.project_list = {
            "projects": [],
            "opportunities": []
        }

    def generate_project_list(self):
        self.project_list["projects"] = self.sqlRead.read_project_list("project")
        self.project_list["opportunities"] = self.sqlRead.read_project_list("opportunity")
    
    def generate_projects(self) -> List:
        return self.sqlRead.read_project_list("project")

