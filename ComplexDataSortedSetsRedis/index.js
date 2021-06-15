
const express = require('express');
const process = require('process');

var app  = express();

const redis = require('./redis');
redis.Client.flushall();

redis.Client.hmset('dog:1',['name','gizmo','age','5']);
redis.Client.hmset('dog:2',['name','dexter','age','6']);
redis.Client.hmset('dog:3',['name','fido','age','5']);

redis.Client.set('dog:name:gizmo','dog:1');
redis.Client.set('dog:name:dexter','dog:2');
redis.Client.set('dog:name:fido','dog:3');

app.use((req,res,next) => {
console.time('request');
    next();
})

app.get('/dog/name/:name',(req,res) => {
    var now = Date.now();
redis.Client.zadd('dog:last-lookup',[now,'dog:name:'+ req.params.name]);
redis.get('dog:name:'+ req.params.name)
.then((data) => {
    redis.Client.hset(data,'last-lookup',now)
return data;
})
.then(redis.hgetall)
.then((data) => res.send(data))
    console.timeEnd('request');
})

app.get('/dog/any',(req,res) => {
    redis.zrevrangebyscore('dog:last-lookup','+inf','-inf')
    .then((data) => Promise.all(data.map(redis.get)))
    .then((data) => Promise.all(data.map(redis.hgetall)))
    .then((data) => res.send(data));
        console.timeEnd('request');
    })

    app.get('/dog/latest',(req,res) => {
var now = Date.now();
var minuteAgo = now - 60000;
        redis.zrevrangebyscore('dog:last-lookup',now,minuteAgo)
        .then((data) => Promise.all(data.map(redis.get)))
        .then((data) => Promise.all(data.map(redis.hgetall)))
        .then((data) => res.send(data));
            console.timeEnd('request');
        })

    app.listen(process.argv[2]);