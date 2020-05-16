from planner import create_app
from app_config import DevConfig

app = create_app(DevConfig)

if __name__ == "__main__":
    app.run(debug=True, port=5000)  # parametr debud = True okamžité provedení změny
