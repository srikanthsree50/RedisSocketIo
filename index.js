const config = require('./config');
const process = require('process');
const express = require('express');
const redis = require('redis');
const { redis_port, redis_host } = require('./config');

const app  = express();

var redisClient = redis.createClient(redis_port,redis_host);
redisClient.set("REDIS_KEY","0");

app.get('/',(req,res) => {
redisClient.incr("REDIS_KEY");
redisClient.get("REDIS_KEY",(err,reply) => {
res.send("<html><head><title>title</title></head><body><h1> welcome to redis web application</h1></br> "+ "redis-count :" +reply+"</body></html>");
res.end();
});
});
app.listen(process.argv[2]);