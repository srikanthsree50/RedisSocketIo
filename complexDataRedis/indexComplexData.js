
const express = require('express');
const process = require('process');

var app  = express();
const redis = require('./redisComplexData');
redis.Client.flushall();

redis.Client.hmset('dog:1',['name','gizmo','age','5']);
redis.Client.hmset('dog:2',['name','dexter','age','6']);
redis.Client.hmset('dog:3',['name','fido','age','5']);

redis.Client.set('dog:name:gizmo','dog:1');
redis.Client.set('dog:name:dexter','dog:2');
redis.Client.set('dog:name:fido','dog:3');

redis.Client.lpush('dog:age:5',['dog:1','dog:3']);
redis.Client.lpush('dog:age:6','dog:2');

app.use((req,res,next) => {
console.time('request');
    next();
})

app.get('/dog/name/:name',(req,res) => {
redis.get('dog:name:' + req.params.name)
.then(redis.hgetall)
.then((data) => res.send(data))
    console.timeEnd('request');
})


app.get('/dog/age/:age',(req,res) => {
    redis.lrange('dog:age:' + req.params.age)
    .then((data) => Promise.all(data.map(redis.hgetall)))
    .then((data) => res.send(data));
        console.timeEnd('request');
    })

    app.listen(process.argv[2]);