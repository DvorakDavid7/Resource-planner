from planner.Sql.SqlRead import SqlRead
from planner.Sql.SqlWrite import SqlWrite


class Model:
    def __init__(self):
        self.sqlRead = SqlRead()
        self.sqlWrite = SqlWrite()
