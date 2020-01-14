from flask import Flask
import app_config
from flask_session import Session

app = Flask(__name__)
app.config.from_object(app_config)
Session(app)

from planner.Views import EditView, TableView, LoginView, GroupsView
