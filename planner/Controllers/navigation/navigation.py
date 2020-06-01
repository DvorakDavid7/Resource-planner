from flask import Blueprint,request, json, jsonify, make_response
from planner.Models.DataModels.DateRange import DateRange


navigation = Blueprint("navigation", __name__)


@navigation.route('/navigation/set_week', methods=["POST"])
def navigation_week():
    receive_data = json.loads(str(request.get_data().decode('utf-8')))
    dateRange = DateRange("", "", "", "")
    dateRange.set_basedOnWeekNumber(**receive_data["date"])
    result = {
        "dateRange": dateRange.__dict__
    }
    return make_response(jsonify(result), 200)
