

class Project:
    def __init__(self, cid: str, full_name: str, project_manager: str, status="NULL") -> None:
        self.cid = cid
        self.fullName = full_name
        self.projectManager = project_manager
        self.status = status
