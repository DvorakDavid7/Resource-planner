

class DataHolder():
    def __init__(self, dataConvertor):
        self.dataConvertor = dataConvertor
        self.weeks = self.dataConvertor.weeks

        self.y_start = self.dataConvertor.y_start
        self.y_end = self.dataConvertor.y_end

    def load_table_header(self):
        return self.dataConvertor.table_header_data()

    def load_data_for_work_summary(self):
        self.names = self.dataConvertor.user_id_to_name().copy()
        return self.dataConvertor.work_summary_data()

    def load_data_for_edit(self, user_id):
        self.projects = self.dataConvertor.edit_plan_projects_data(user_id)
        self.opportunity = self.dataConvertor.edit_plan_opportunity_data(user_id)


class Table():
    def __init__(self, dataHolder):
        self.dataHolder = dataHolder
        self.weeks = self.dataHolder.weeks

    def load_header(self):
        table_header = self.dataHolder.load_table_header()
        self.header_columns = list(table_header.keys())
        self.header_content = table_header
        self.y_start = self.dataHolder.y_start
        self.y_end = self.dataHolder.y_end


    def load_content_overview(self):
        self.content = self.dataHolder.load_data_for_work_summary()
        self.names = self.dataHolder.names
        self.rows = list(self.names.keys())

    def load_content_edit(self, user_id):
        self.dataHolder.load_data_for_edit(user_id)

        self.rows_projects = list(self.dataHolder.projects.keys())
        self.rows_opportunity = list(self.dataHolder.opportunity.keys())
        self.rows_complet = self.rows_projects + self.rows_opportunity

        self.content_projects = self.dataHolder.projects
        self.content_opportunity = self.dataHolder.opportunity
        self.content_complet = {**self.content_projects, **self.content_opportunity}

        self.sum = []
        for week in self.weeks:
            tmp = 0
            for row in self.rows_complet:
                if self.content_complet[row][week] != "":
                    tmp += int(self.content_complet[row][week])
            self.sum.append(tmp)
