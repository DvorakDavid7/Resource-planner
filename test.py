from planner.Models.HeaderModel import HeaderModel
from planner.Models.DataModels.DateRange import DateRange
from planner.Models.TableModel import TableModel
from planner.Models.EditModel import EditModel

import time
import json

if __name__ == "__main__":
    date_range = DateRange("2019", "2019", "30", "52")
    header = HeaderModel()
    header.set_dateRange(date_range)
    header.set_fromDatabese()


    table = EditModel(header, "mbendik")
    table.set_projectDetails()

    # print(table.workerPlan("0"))
    print(json.dumps(table.toDict(), indent=4, ensure_ascii=False))