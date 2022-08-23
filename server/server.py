import sqlite3
from flask import Flask, jsonify, request, abort
from argparse import ArgumentParser
from flask.helpers import make_response # this
from os import mkdir, path # this
import json # this


DB = 'db.sqlite'


def get_row_as_dict(row):
    row_dict = {
        'username': row[0],
        'password': row[1],
    }

    return row_dict


app = Flask(__name__)


@app.route('/api/adminAcc', methods=['GET'])
def index():
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM adminAcc')
    rows = cursor.fetchall()

    print(rows)

    db.close()

    rows_as_dict = []
    for row in rows:
        row_as_dict = get_row_as_dict(row)
        rows_as_dict.append(row_as_dict)

    return jsonify(rows_as_dict), 200

@app.route('/api/test', methods=['GET'])
def test():
    return make_response(jsonify({'message': 'It works!'}))

@app.route('/api/login', methods=['POST'])
def login():

    db = sqlite3.connect(DB)

    response_json = None
    response_code = 400

    if not request.json:
        response_json = {'message': 'No JSON data found'}
    elif 'username' not in request.json or 'password' not in request.json:
        response_json = {'message': 'Missing username or password'}
    else:

        username = request.json['username']
        password = request.json['password']

        cursor = db.cursor()
        cursor.execute("SELECT username, password FROM adminAcc WHERE username=?", (username,))
        data = cursor.fetchone()

        if data is None:
            response_json = {'message': 'Username not found'}
        else:
            if username == (data[1]) & password== (data[0]):

                response_json = {
                    'message': 'Login successful',
                    'username': username,
                }
                response_code = 200
            else:
                response_json = {'message': 'Invalid password'}

    return make_response(jsonify(response_json), response_code)


if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=5000, type=int, help='port to listen on')
    args = parser.parse_args()
    port = args.port

    app.run(host='0.0.0.0', port=port)