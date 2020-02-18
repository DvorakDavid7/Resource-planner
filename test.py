from planner.Models.TableModel import TableModel
from planner.Models.HeaderModel import HeaderModel
from planner.Models.EditModel import EditModel


headerModel = HeaderModel()
# headerModel.set_start_end_dates("2020", "2020", "1", "20")
# headerModel.generate_table_header()
headerModel.set_header_based_on_week_number("20", "2020", 10, 10)
print("y start: " + headerModel.year_start + "\ny end: " + headerModel.year_end + "\nw start: " + headerModel.week_start + "\nw end: " + headerModel.week_end,)

# tableModel = TableModel(headerModel)
# tableModel.set_name_list_department("IA")
# tableModel.generate_table_body()

# editModel = EditModel(headerModel, "mbendik")
# editModel.generate_edit_body()

if __name__ == "__main__":
    pass
