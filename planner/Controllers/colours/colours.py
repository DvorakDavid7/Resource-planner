from flask import Blueprint, render_template, request, json, jsonify, make_response
from planner.authentication import login_required


colours = Blueprint("colours", __name__, template_folder="templates", static_folder="static", static_url_path='/colours/static')

@colours.route('/color_setting', methods=["GET"])
@login_required
def color_setting():
    with open("data/color_settings.txt", "r") as file:
        data = json.load(file)
    return render_template("color_seting.html", data=data)


@colours.route('/color_setting/save', methods=["POST"])
def color_setting_save():
    receive_data = json.loads(str(request.get_data().decode('utf-8')))
    with open("data/color_settings.txt", "w") as file:
        json.dump(receive_data["data"], file, indent=4)
    return "OK"


@colours.route('/color_setting/send_data', methods=["POST"])
def color_setting_send_data():
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
