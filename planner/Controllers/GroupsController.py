from flask import make_response, jsonify, render_template, json
from werkzeug.utils import redirect

from planner.Controllers.Controller import Controller
from planner.Models.Model import Model


class GroupsController(Controller):
    def __init__(self):
        super().__init__()

    @staticmethod
    def index():
        return render_template("groups.html")

    @staticmethod
    def show_groups():
        result = []
        with open("groups.txt", "r", encoding='utf8') as file:
            data = json.load(file)
        for key in data.keys():
            result.append(key)
        return make_response(jsonify({"data": result}), 200)

    @staticmethod
    def save_group(form_data):
        name_list = []
        group_name = form_data.get("name")
        group_members = form_data.get("members").split("\n")
        model = Model()
        for member in group_members:
            user_id = member.replace("\r", "")
            user_details = model.sqlRead.read_user_details(user_id)
            name_list.append([user_id, user_details[0][0], user_details[0][1]])
        with open("groups.txt", "r", encoding='utf8') as file:
            data = json.load(file)
            data[group_name] = name_list
        with open("groups.txt", "w", encoding='utf8') as file:
            json.dump(data, file, ensure_ascii=False, indent=4)
        return redirect('/groups')
