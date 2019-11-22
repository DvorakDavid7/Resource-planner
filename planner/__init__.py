
from flask import Flask
from flask_session import Session  # https://pythonhosted.org/Flask-Session
import app_config


app = Flask(__name__)
app.config.from_object(app_config)
Session(app)


from planner import views
