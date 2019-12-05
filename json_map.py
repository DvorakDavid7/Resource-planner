

table_overview = {
                "header":
                {
                    "year_start": "2019",
                    "year_end": "2020",
                    "weeks": [41, 42, 43],
                    "working_hours": "[41(40)", "42(40)", "43(16)"],
                    "dates": ["29.1 30.1", "29.1 30.1", "29.1 30.1"]
                },
                "body":
                    [
                        {"id": 0, "user_id": "ddvorak", "deparment": "IA" "name": "Dvořák", "values": {"41": 40, "42": 40 "43": 20}},
                        {"id": 1, "user_id": "akolarik", "department": "IA" "name": "Kolařík", "values":  {"41": 40, "42": 40 "43": 20}},
                    ]
                }



table_edit = {
            "header" :
            {
                "year_start": "2019",
                "year_end": "2020",
                "weeks": [41, 42, 43],
                "working_hours": {41:"40", 42:"40", 43:"16"},
                "dates": ["29.1 30.1", "29.1 30.1", "29.1 30.1"]
            },
            "body" :
                    {
                    "projects": [
                                    {"id": 0,"project_id": "9920","zakazka_id": "TDU29", "nazev": "CSOB - upravy", "project_manager":"David Dvořák", "values" : {"41":40, "42":40 "43":20}},
                                    {"id": 1,"project_id": "9985","zakazka_id": "TDU29", "nazev": "CSOB - upravy", "project_manager":"David Dvořák", "values" : {"41":40, "42":40 "43":20}},
                                ],
                                
                    "opportunity":[
                                    {"id": 2,"status": 1,"zakazka_id": "TDU29", "nazev": "CSOB - upravy", "project_manager":"David Dvořák", "values" : {"41":40, "42":40 "43":20}},
                                    {"id": 3,"status": 1,"zakazka_id": "TDU29", "nazev": "CSOB - upravy", "project_manager":"David Dvořák", "values" :  {"41":40, "42":40 "43":20}},
                                ],
                    }
            }

print(table["header"]["dates"])
