from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)


@app.route('/')
def index():
    return render_template('index.html')


@socketio.on('message', namespace='/test/')
def test_message(message):
    token = request.args.get('token', '')
    print token
    print message
    emit('response', {'data': 'got it!'})


if __name__ == '__main__':
    socketio.run(app, debug=True, host='127.0.0.1')
