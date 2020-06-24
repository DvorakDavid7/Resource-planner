


class Worker():
    def __init__(self, id: str, fullName: str, department: str, role: str=None) -> None:
        self.id = id
        self.department = department
        self.fullName = fullName
        self.role = role
