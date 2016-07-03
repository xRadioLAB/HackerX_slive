# -*- coding: utf-8 -*-
from flask import Flask, render_template, request, session
from flask_socketio import SocketIO
# import requests
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

if __name__ == '__main__':
    # db.create_all()
    dev = False
    if dev:
        host = '127.0.0.1'
    else:
        host = '0.0.0.0'
    socketio.run(app, debug=True, host=host)
