from flask import make_response, jsonify, render_template, json
from werkzeug.utils import redirect

from planner.Controllers.Controller import Controller
from planner.Models.Model import Model


class GroupsController(Controller):
    def __init__(self):
        super().__init__()

    @staticmethod
    def index():
        with open("data/groups.txt", "r", encoding='utf8') as file:
            data = json.load(file)
        return render_template("pages/groups.html", groups=data.keys())

    @staticmethod
    def show_groups():
        result = []
        with open("data/groups.txt", "r", encoding='utf8') as file:
            data = json.load(file)
        for key in data.keys():
            result.append(key)
        return make_response(jsonify({"data": result}), 200)

    @staticmethod
    def save_group(form_data):
        name_list = []
        group_name = form_data.get("name")
        if group_name == "":
            return "<h1>Error: Invalid group name</h1>"
        group_members = form_data.get("members").split("\n")
        model = Model()
        for member in group_members:
            user_id = member.replace("\r", "")
            user_details = model.sqlRead.read_user_details(user_id)
            if len(user_details) == 0:
                continue
            try:
                name_list.append([user_id, user_details[0][0], user_details[0][1]])
            except Exception as err:
                return f'''
                <h1>Error: \"{str(err)}\" Be sure to enter the correct user ids and delete
                ALL blank lines and try it again</h1
                '''
        with open("data/groups.txt", "r", encoding='utf8') as file:
            data = json.load(file)
            data[group_name] = name_list
        with open("data/groups.txt", "w", encoding='utf8') as file:
            json.dump(data, file, ensure_ascii=False, indent=4)
        return redirect('/groups')

    @staticmethod
    def delete_group(receive_data):
        key = receive_data["data"]
        with open("data/groups.txt", "r", encoding='utf8') as file:
            data = json.load(file)
            del data[key]
        with open("data/groups.txt", "w", encoding='utf8') as file:
            json.dump(data, file, ensure_ascii=False, indent=4)
        return "OK"

    @staticmethod
    def group_members(receive_data):
        names = []
        group = receive_data["data"]
        with open("data/groups.txt", "r", encoding='utf8') as file:
            data = json.load(file)
        for name in data[group]:
            names.append([name[2], name[1]])
        return make_response(jsonify({"data": names}), 200)
