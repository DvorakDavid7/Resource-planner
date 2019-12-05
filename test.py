from datetime import date

import planner

from planner.models import Table, DateManager
from planner.sql import SQL



sql = SQL()
dtm = DateManager()
table = Table(sql, dtm)
table.set_date_range(date.today())
table.generate_header()

table.generate_edit("nkolkova")

