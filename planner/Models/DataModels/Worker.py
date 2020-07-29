


class Worker():
    def __init__(self, id: str, fullName: str, department: str, role: str=None, isWorkerActive: bool=True) -> None:
        self.id = id
        self.department = department
        self.fullName = fullName
        self.role = role
        self.isWorkerActive = isWorkerActive 
