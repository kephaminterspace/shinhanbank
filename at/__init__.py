# -*- coding: utf-8 -*-
import sys

reload(sys)
sys.setdefaultencoding("utf-8")
from flask import Flask, Blueprint, request, render_template, url_for, send_from_directory, jsonify
import logging, requests, json, uuid
from .utils import *

logger = logging.getLogger(__name__)
app = Flask(__name__, template_folder="templates", static_folder="statics")
app.secret_key = 'shinhanbankfajdslkf'


@app.route('/robots.txt')
def static_from_root():
    return send_from_directory(app.static_folder, request.path[1:])


@app.route("/", methods=['POST', 'GET'])
def index():
    print request.url_root
    return render_template('index.html')


@app.route("/thankyou", methods=['GET'])
def thankyou():
    return render_template('thankyou.html', hostname=request.url_root)


@app.route('/callApi', methods=['POST'])
def callApi():
    data = request.form
    data = json.dumps(data)
    data = json.loads(data)

    url = "https://api.hubapi.com/contacts/v1/search/query?q=" + data[
        'phone'] + "&hapikey=6f5349f4-cc07-4066-845b-4c8378f7bc0c"
    header = {'Content-Type': 'application/json'}
    res = requests.get(url=url, headers=header)
    res_json = res.json()

    total = res_json["total"]

    checkPhoneExist = False

    if (total > 0):
        contacts = res_json["contacts"]
        for contact in contacts:
            if (contact['properties']["phone"]["value"] == data['phone']):
                checkPhoneExist = True
                break

    if checkPhoneExist == True:
        return jsonify({
            'status': 'false',
            'data': 'user exits',
            'message': 'Số điện thoại đã được đăng ký'
        })
    else:
        datas = {
            "properties": [
                {"property": "identifier", "value": str(uuid.uuid4())},
                {"property": "firstname", "value": data['fullName']},
                {"property": "email", "value": data['email']},
                {"property": "phone", "value": data['phone']},
                {"property": "hs_lead_status", "value": "NEW"},
                {"property": "region", "value": data['address']},
                {"property": "salary_payment_method", "value": data['check']},
                {"property": "card_shinhanbank", "value": data['card_shinhanbank']},
                {"property": "monthly_income_level", "value": data['money']},
                {"property": "aff_source", "value": data['aff_source']},
                {"property": "aff_sid", "value": data['aff_sid']},
            ]}

        # print datas
        url = "https://api.hubapi.com/contacts/v1/contact/?hapikey=6f5349f4-cc07-4066-845b-4c8378f7bc0c"
        header = {'Content-Type': 'application/json'}
        res = requests.post(url=url, data=json.dumps(datas), headers=header)
        res_json = res.json()

        print res_json

        if res_json:
            if "status" in res_json and res_json["status"] == "error":
                if "error" in res_json and res_json["error"] == "CONTACT_EXISTS":

                    check_email_exists = False
                    for item in res_json["identityProfile"]["identity"]:
                        if item["type"] == "EMAIL":
                            check_email_exists = True
                            break

                    if check_email_exists:
                        return jsonify({
                            'status': 'false',
                            'data': 'user exits',
                            'message': 'Email đã được đăng ký'
                        })
                    else:
                        return jsonify({
                            'status': 'false',
                            'data': 'user exits',
                            'message': 'Người dùng này đã tồn tại'
                        })
                else:
                    return jsonify({
                        'status': 'false',
                        'data': res_json,
                    })
            return jsonify({
                'status': 'true',
                'data': res_json,
            })
