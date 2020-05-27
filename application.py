from planner import create_app
import app_config


app = create_app(app_config.DevConfig)


if __name__ == "__main__":
    if app.config["ENV"] != "PRODUCTION":
        app.run(debug=True, port=5000)  # parametr debud = True okamžité provedení změny
    else:
        app.run()