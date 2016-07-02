from flask import Flask, render_template, request
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)


@app.route('/')
def index():
    text = request.args.get('text', '')
    if text:
        socketio.emit('slack', {'ok': text}, namespace='/socket/')
        return text + ' +1'
    else:
        socketio.emit('slack', {'ok': True}, namespace='/socket/')
        return 'Hello,World!'


@app.route('/vote/')
def vote():
    return render_template('index.html')


if __name__ == '__main__':
    dev = True
    if dev:
        host = '127.0.0.1'
    else:
        host = '0.0.0.0'
    socketio.run(app, debug=True, host=host)
