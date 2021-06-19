const express = require('express'),
socketio = require('socket.io'),
session = require('express-session')

var app = express();
var server = app.listen(8080);
var io = socketio(server);

var sessionMiddleware = session({
    secret:'secret',
    resave:false,
    saveUninitialized:true
})

app.use(sessionMiddleware);
app.use((req,res,next) => {
    console.log(`from Express : ${req.session.name}`);

});
app.use(express.static('static'));

io.use((socket,next) => {
 sessionMiddleware(socket.request,{},next);
})

io.on('connection',(socket) => {
console.log(socket.request.session);
if(socket.request.session.name !== undefined){
socket.emit('name',socket.request.session.name);
io.emit('event',socket.request.session.name+' has joined..');
}

socket.on('name',(name) => {
socket.request.session.name = name;
socket.request.session.save();
socket.broadcast.emit('event',name +' says hello');
})

})
