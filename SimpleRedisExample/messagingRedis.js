const config = require('../config');
const process = require('process');
const express = require('express');
const redis = require('redis');
const { redis_port, redis_host } = require('../config');

const app  = express();


var redisClient = redis.createClient(redis_port,redis_host);
var publishClient = redis.createClient(redis_port,redis_host);

redisClient.on('message',(channel,message) => {
    console.log(message);
})
redisClient.subscribe("REQUESTS");

app.get('/',(req,res) => {

publishClient.publish("REQUESTS", `request on ${req.socket.localPort} for ${req.url}`);
console.log(` local log for ${req.url}`);

    res.end();
});
app.listen(process.argv[2]);