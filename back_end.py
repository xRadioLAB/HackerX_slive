# -*- coding: utf-8 -*-
from flask import Flask, render_template, request, session
from flask_socketio import SocketIO
import requests
import json
# from flask_sqlalchemy import SQLAlchemy
# import os

# BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + '/HackerX_slive'
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(BASE_DIR, 'data.sqlite3')
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
socketio = SocketIO(app)
# db = SQLAlchemy(app)

NAMES = [u'悦悦', u'小郝', u'木木', u'John', u'lxvc']
Slack_url = 'https://hooks.slack.com/services/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'

# class Voter(db.Model):
#     __tablename__ = 'voters'
#     id = db.Column(db.String(20), primary_key=True, index=True, unique=True)
#     name = db.Column(db.String(64, convert_unicode=True))
#
#     def __init__(self, uid, name):
#         self.id = uid
#         self.name = name
#
#     def __repr__(self):
#         return '<Voter %r>' % self.name
#
#
# class Alternative(db.Model):
#     __tablename__ = 'alternatives'
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(20))
#     vote = db.Column(db.Integer)
#
#     def __init__(name, vote=0):
#         self.name = name
#         self.vote = vote

@app.route('/')
def index():
    text = request.args.get('text', '')
    # user_id = request.args.get('user_id', '')
    # user_name = request.args.get('user_name')
    # if user_id:
    #     try:
    #         voter = Voter.query.get(user_id)
    #     except:
    #         voter = Voter(user_id, user_name)
    #         db.session.add(voter)
    #         db.session.commit()
    if text:
        if unicode(text) in NAMES:
            socketio.emit('slack', {'name': text}, namespace='/socket/')
            return text + ' +1'
        else:
            return u'『' + text + u'』' + u'同学似乎去火星了呀~'
    else:
        return 'Hello, World!'


@app.route('/vote/')
def vote():
    return render_template('index.html')


@app.route('/goto/')
def goto():
    action = request.args.get('action', '')
    print action
    if action is 'next':
        socketio.emit('next', namespace="/socket/")
    elif action is 'previous':
        socketio.emit('previous', namespace="/socket/")
    return render_template('goto.html')

@app.route('/flag/')
def flag():
    action = request.args.get('action', '')
    if 'flag' in session:
        flag = session.get('flag')
        if action == 'next':
            flag += 1
        elif action == 'previous' and flag > 1:
            flag -= 1
        session['flag'] = flag
    else:
        session['flag'] = 1
    if session['flag'] is 10:
        requests.post(Slack_url, data=json.dumps({'username':u'五轴飞行器','text':u'欢迎 star: https://github.com/xinhuaRadioLAB/HackerX_slive'}))
    return 'vc'

if __name__ == '__main__':
    # db.create_all()
    dev = False
    if dev:
        host = '127.0.0.1'
    else:
        host = '0.0.0.0'
    socketio.run(app, debug=True, host=host)
