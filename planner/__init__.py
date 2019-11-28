
from flask import Flask
from flask_session import Session  # https://pythonhosted.org/Flask-Session
import app_config

from planner.database import Table, DataHolder
from planner.sql import SQL
from planner.DateManager import DateManager
from planner.DataConvertor import DataConvertor


app = Flask(__name__)
app.config.from_object(app_config)
Session(app)


from planner import views
