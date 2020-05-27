from flask import Blueprint, render_template, request

tests = Blueprint("tests", __name__, template_folder="templates", static_folder="static", static_url_path='/tests/static')

@tests.route('/tests', methods=["GET"])
def tests_get():

    return render_template("tests.html")