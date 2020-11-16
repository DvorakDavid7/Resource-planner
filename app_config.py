import os


from dotenv import load_dotenv
load_dotenv()


class AutoConfig:
    ENV = os.getenv("ENV")  # 'PRODUCTION', 'DEMO', 'DEVELOPMENT'
    if not ENV:
        raise ValueError("Need to define ENV environment variable")

    CLIENT_SECRET = os.getenv("CLIENT_SECRET")
    if not CLIENT_SECRET:
        raise ValueError("Need to define CLIENT_SECRET environment variable")

    AUTHORITY = os.getenv("AUTHORITY")
    if not AUTHORITY:
        raise ValueError("Need to define AUTHORITY environment variable")

    CLIENT_ID = os.getenv("CLIENT_ID")
    if not CLIENT_ID:
        raise ValueError("Need to define CLIENT_ID environment variable")

    CONNECTION_STRING = os.getenv("CONNECTION_STRING")
    if not CONNECTION_STRING:
        raise ValueError("Need to define CONNECTION_STRING environment variable")

    REDIRECT_PATH = "/getAToken"
    ENDPOINT = 'https://graph.microsoft.com/v1.0/users'
    SCOPE = ["User.ReadBasic.All"]
    SESSION_TYPE = "filesystem"
