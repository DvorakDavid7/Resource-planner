# Resource planner app

## Local installation
1) Turn on VPN

2) set virtual evirnment
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
