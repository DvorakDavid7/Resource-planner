from planner.Models.HeaderModel import HeaderModel
from planner.Models.DataModels.DateRange import DateRange
from planner.Models.TableModel import TableModel
import time

date_range = DateRange("2020", "2020", "1", "11")
header = HeaderModel()
header.set_dateRange(date_range)
header.set_currents()
header.set_fromDatabese()


table = TableModel(header)
table.set_workerList("IA")


""" for _ in range(10):
    start = time.time()
    table.test()
    print(time.time() - start) """

# table.workerList.sort(key=lambda worker: worker.fullName, reverse=False)

table.set_values()
print(table.toDict())
