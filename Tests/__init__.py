from planner import create_app
import app_config

app = create_app(app_config.AutoConfig)
