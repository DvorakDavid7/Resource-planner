from planner import create_app
import app_config


app = create_app(app_config.AutoConfig)


if __name__ == "__main__":
    if app.env == "DEVELOPMENT":
        app.run(debug=True, port=5000, host="0.0.0.0")  # parameter debug = True change immediately
    else:
        app.run(debug=False, port=5000, host="0.0.0.0")
