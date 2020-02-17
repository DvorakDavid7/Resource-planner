from planner.Models.Model import Model


class TableModel(Model):
    def __init__(self, tableHeader):
        super().__init__()
        self.tableHeader = tableHeader
        self.name_list = []  # [(...,...,...), (...,...,...), (...,...,...)]
        self.table_body = []

    def generate_table_body(self):
        result_row = {"user_id": "", "department": "", "name": "", "values": {}}
        plan = {}
        for i in range(len(self.name_list)):
            user_id = self.name_list[i][0]
            department = self.name_list[i][1]
            name = self.name_list[i][2]
            for week in self.tableHeader.table_header["weeks"]:
                plan[int(week)] = ""
            y_start = self.tableHeader.year_start
            w_start = self.tableHeader.week_start
            y_end = self.tableHeader.year_end
            w_end = self.tableHeader.week_end
            worker_plan_table = self.sqlRead.read_worker_summary_plan(user_id, y_start, w_start, y_end, w_end)
            for row in worker_plan_table:
                plan[row[0]] = row[1]
            result_row["user_id"] = user_id
            result_row["department"] = department
            result_row["name"] = name
            result_row["values"] = plan.copy()
            self.table_body.append(result_row.copy())

    def set_name_list_department(self, department):
        if len(department) == 2:
            self.name_list = self.sqlRead.read_department(department)
        else:
            department = str(tuple(department.split(" ")))
            self.name_list = self.sqlRead.read_department(department)

    def set_name_list_group(self, group):
        self.name_list = group
