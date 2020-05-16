from flask import Blueprint, render_template, request, json, jsonify, make_response, redirect
from planner.Models.Model import Model
from planner.authentication import login_required

groups = Blueprint("groups", __name__, template_folder="templates", static_folder="static", static_url_path='/colours/static')


@groups.route('/groups', methods=["GET"])
@login_required
def groups_get():
    with open("data/groups.txt", "r", encoding='utf8') as file:
        data = json.load(file)
    return render_template("groups.html", groups=data.keys())


@groups.route('/groups/show_groups', methods=["POST"])
def show_groups():
    result = []
    with open("data/groups.txt", "r", encoding='utf8') as file:
        data = json.load(file)
    for key in data.keys():
        result.append(key)
    return make_response(jsonify({"data": result}), 200)


@groups.route('/groups/save_group', methods=["POST"])
def groups_save_group():
    name_list = []
    group_name = request.form.get("name")
    if group_name == "":
        return "<h1>Error: Invalid group name</h1>"
    group_members = request.form.get("members").split("\n")
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


@groups.route('/groups/delete_group', methods=["POST"])
def groups_delete_group():
    receive_data = json.loads(str(request.get_data().decode('utf-8')))
    key = receive_data["data"]
    with open("data/groups.txt", "r", encoding='utf8') as file:
        data = json.load(file)
        del data[key]
    with open("data/groups.txt", "w", encoding='utf8') as file:
        json.dump(data, file, ensure_ascii=False, indent=4)
    return "OK"


@groups.route('/groups/group_members', methods=["POST"])
def groups_group_members():
    receive_data = json.loads(str(request.get_data().decode('utf-8')))
    names = []
    group = receive_data["data"]
    with open("data/groups.txt", "r", encoding='utf8') as file:
        data = json.load(file)
    for name in data[group]:
        names.append([name[2], name[1]])
    return make_response(jsonify({"data": names}), 200)
