from planner.Sql.SqlWrite import SqlWrite
from planner.Models.HeaderModel import HeaderModel
from planner.Sql.SqlRead import SqlRead
from typing import Dict, Tuple
from planner.Models.Model import Model
import copy


class ProjectEditModel(Model):
    def __init__(self, tableHeader: HeaderModel, project_id):
        super().__init__()
        self.tableHeader = tableHeader
        self.project_id = project_id

    def generate_edit_body(self, y_start: str, y_end: str, w_start: str, w_end: str, project_id: str) -> Tuple:
        plan: Dict[int, Dict[str, str]] = {}
        result = {}
        name_mapper = {}
        for week in self.tableHeader.table_header["weeks"]:
            plan[int(week)] = {
                "planned": "",
                "alocated": ""
            }
        sql = SqlRead()
        workers = sql.read_workers_on_project(y_start, y_end, w_start, w_end, project_id)

        for row in workers:
            week = int(row[2])
            planned = row[3]
            user_id = row[0]
            if not name_mapper.get(user_id):
                full_name = self._full_name(user_id)
                name_mapper[user_id] = full_name
            else:
                full_name = name_mapper[user_id]

            if not result.get(user_id):
                result[user_id] = copy.deepcopy(plan)
            
            if prev_value := result[user_id][week]["planned"] != "":
                result[user_id][week]["planned"] = str(int(prev_value) + int(planned))
            else:
                result[user_id][week]["planned"] = str(planned)

            year = self._current_year(week)
            result[user_id][week]["alocated"] = sql.read_worker_alocation(user_id, year, str(week))


            '''
            for i in self.tableHeader.table_header["weeks"]:
                if result[user_id][int(i)]["alocated"] == "":
                    result[user_id][int(i)]["alocated"] = sql.read_worker_alocation(user_id, self._current_year(int(i)), str(i))
            '''
        return (result, name_mapper)
    
    def _full_name(self, user_id: str) -> str:
        sql = SqlRead()
        full_name_tupple = sql.read_full_name(user_id)
        try:
            first_name = full_name_tupple[0][0]
            second_name = full_name_tupple[0][1]
            return first_name + " " + second_name
        except Exception:
            return user_id

    def _current_year(self, week: int):     
        if week < int(self.tableHeader.week_start):
            return str(int(self.tableHeader.year_start) + 1)
        else:
            return self.tableHeader.year_start
