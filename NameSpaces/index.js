const express = require('express'),
socketio = require('socket.io')

var app = express();
var server = app.listen(8080);
var io = socketio(server);

app.use(express.static('static'));

var namespace = io.of('/namespace');

namespace.on('connection',(socket) => {
namespace.emit('event','connected to namespace..');
io.emit('event','normal');
})
