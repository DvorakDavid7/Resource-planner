from flask import json, jsonify, make_response, render_template, request
from planner.Controllers.Controller import Controller


class ColorSettingController(Controller):
    def __init__(self):
        pass

    # GET
    @staticmethod
    def index():
        with open("data/color_settings.txt", "r") as file:
            data = json.load(file)
        return render_template("color_seting.html", data=data)

    # POST
    @staticmethod
    def save(request_data):
        with open("data/color_settings.txt", "w") as file:
            json.dump(request_data["data"], file, indent=4)
        return "OK"
    
    # POST
    @staticmethod
    def send_data():
        legend = {}
        positive = []
        negative = []
        with open("data/color_settings.txt", "r") as file:
            data = json.load(file)
        for record in data["data"]:
            if record["sign"] == "less":
                legend["-" + record["value"]] = record["color"]
                negative.append((-1) * int(record["value"]))
            else:
                legend[record["value"]] = record["color"]
                positive.append(int(record["value"]))
        values = sorted(positive, reverse=True) + sorted(negative, reverse=True)
        return make_response(jsonify({"data": {"values": values, "legend": legend}}), 200)
