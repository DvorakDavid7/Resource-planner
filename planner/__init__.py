from flask import Flask
from flask_session.__init__ import Session

# v Azure webapp aplikace bezi za reverse proxy, ktera terminuje SSL,
# je ale potreba prebrat spravne schema, jinak by Flask generoval spatny url (http na misto https)
class ReverseProxied(object):
    def __init__(self, app):
        self.app = app

    def __call__(self, environ, start_response):
        scheme = environ.get('HTTP_X_FORWARDED_PROTO')
        if scheme:
            environ['wsgi.url_scheme'] = scheme
        return self.app(environ, start_response)


def create_app(config_class):
    app = Flask(__name__)
    app.config.from_object(config_class)
    app.wsgi_app = ReverseProxied(app.wsgi_app)
    Session(app)

    from planner.Controllers.table.table import table
    from planner.Controllers.edit.edit import edit
    from planner.Controllers.groups.groups import groups
    from planner.Controllers.colours.colours import colours
    from planner.Controllers.finance.finance import finance
    from planner.Controllers.projects.projects import projects
    from planner.Controllers.alocation.alocation import alocation
    from planner.Controllers.home.home import home
    from planner.Controllers.navigation.navigation import navigation

    app.register_blueprint(table)
    app.register_blueprint(edit)
    app.register_blueprint(groups)
    app.register_blueprint(colours)
    # app.register_blueprint(finance)
    app.register_blueprint(projects)
    app.register_blueprint(alocation)
    app.register_blueprint(home)
    app.register_blueprint(navigation)
    return app