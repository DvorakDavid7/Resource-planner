from typing import List
from planner.Models.Model import Model


class EditModel(Model):
    def __init__(self, tableHeader, user_id):
        super().__init__()
        self.tableHeader = tableHeader
        self.user_id = user_id
        self.edit_table = {"projects": [], "opportunity": []}

    def generate_edit_body(self):
        projects = self.__id_values("project")
        opportunity = self.__id_values("opportunity")
        for row in projects:
            project_details = self.sqlRead.read_edit_data_details("project", row["id"])[0]
            row["name"] = project_details[0]
            row["project_manager"] = project_details[1] if project_details[1] else ""
        for row in opportunity:
            opportunity_details = self.sqlRead.read_edit_data_details("opportunity", row["id"])[0]
            row["name"] = opportunity_details[0]
            row["project_manager"] = opportunity_details[1] if opportunity_details[1] else ""
            row["status"] = opportunity_details[2]
        self.edit_table["projects"] = projects
        self.edit_table["opportunity"] = opportunity

    def __id_values(self, data_for) -> List:
        plan = {}
        result_row = {}
        result = []
        y_start = self.tableHeader.year_start
        w_start = self.tableHeader.week_start
        y_end = self.tableHeader.year_end
        w_end = self.tableHeader.week_end
        worker_plan_table = self.sqlRead.read_worker_plan(data_for, self.user_id, y_start, w_start, y_end, w_end)
        for week in self.tableHeader.table_header["weeks"]:
            plan[int(week)] = ""
        for row in worker_plan_table:
            task_id = row[0]
            week = row[1]
            planned = row[2]
            current_value = 0
            if task_id in result_row:
                current_value = result_row[task_id][int(week)]
            else:
                result_row[task_id] = plan.copy()
            if current_value and planned and current_value != 0:
                result_row[task_id][week] = planned + current_value
            else:
                result_row[task_id][week] = planned
        for id_key in result_row:
            result.append({"id": id_key,  "values": result_row[id_key]})
        return result
