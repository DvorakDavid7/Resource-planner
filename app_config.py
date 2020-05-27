import os


class BaseConfig():
    ENV = "DEMO"


class DevConfig(BaseConfig):
    CLIENT_SECRET = "gKx@XbR?C:_T345z3RghHus@Q?e2H.uh" # Our Quickstart uses this placeholder
    # In your production app, we recommend you to use other ways to store your secret,
    # such as KeyVault, or environment variable as described in Flask's documentation here
    # https://flask.palletsprojects.com/en/1.1.x/config/#configuring-from-environment-variables
    # CLIENT_SECRET = os.getenv("CLIENT_SECRET")
    # if not CLIENT_SECRET:
    #     raise ValueError("Need to define CLIENT_SECRET environment variable")

    AUTHORITY = "https://login.microsoftonline.com/67b7de17-01a8-410a-a645-3eacd61c1111"  # For multi-tenant app
    # AUTHORITY = "https://login.microsoftonline.com/67b7de17-01a8-410a-a645-3eacd61c1111"

    CLIENT_ID = "ce1c09c8-61cd-4108-abeb-5e47172ade9f"

    REDIRECT_PATH = "/getAToken"  # It will be used to form an absolute URL
        # And that absolute URL must match your app's redirect_uri set in AAD

    # You can find more Microsoft Graph API endpoints from Graph Explorer
    # https://developer.microsoft.com/en-us/graph/graph-explorer
    ENDPOINT = 'https://graph.microsoft.com/v1.0/users'  # This resource requires no admin consent

    # You can find the proper permission names from this document
    # https://docs.microsoft.com/en-us/graph/permissions-reference
    SCOPE = ["User.ReadBasic.All"]

    SESSION_TYPE = "filesystem"  # So token cache will be stored in server-side session

    CONNECTION_STRING = '''Driver={ODBC Driver 17 for SQL Server}; Server=tcp:dwhdbsrv.database.windows.net,1433;Database=DWH-DB;Uid=rpappservice;Pwd=Te8Sx.652kZb;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30'''


class ProdConfig(BaseConfig):
    CLIENT_SECRET = os.getenv("CLIENT_SECRET")
    # if not CLIENT_SECRET:
    #     raise ValueError("Need to define CLIENT_SECRET environment variable")

    AUTHORITY = os.getenv("AUTHORITY")
    # if not AUTHORITY:
    #     raise ValueError("Need to define AUTHORITY environment variable")

    CLIENT_ID = os.getenv("CLIENT_ID")
    # if not CLIENT_ID:
    #     raise ValueError("Need to define CLIENT_ID environment variable")

    REDIRECT_PATH = "/getAToken"  
    ENDPOINT = 'https://graph.microsoft.com/v1.0/users'
    SCOPE = ["User.ReadBasic.All"]
    SESSION_TYPE = "filesystem"


    CONNECTION_STRING = os.getenv("CONNECTION_STRING")
    # if not CONNECTION_STRING:
    #     raise ValueError("Need to define CONNECTION_STRING environment variable")