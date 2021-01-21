# Resource planner app

## Local installation
1) Turn on VPN

2) set virtual environment
```PowerShell
py -3 -m venv venv
venv\scripts\activate
```

3) Install requirements
```PowerShell
pip install -r requirements.txt
```

4) Install Flask app (optional)
```PowerShell
$env:FLASK_APP = "application.py"
python -m flask run
```

5) Create file .env and set these values:
```bash
ENV=DEVELOPMENT
CLIENT_SECRET=
AUTHORITY=
CLIENT_ID=
CONNECTION_STRING=
```
