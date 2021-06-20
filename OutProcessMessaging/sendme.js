const process = require('process'),
config =require('../config.js'),
socketioEmitter = require('socket.io-emitter');

var io = socketioEmitter({host:config.redis_host,port:config.redis_port});

io.to(process.argv[2]).emit('event',process.argv[3]);
setTimeout(() => {
    process.exit(0)
}, 1000);