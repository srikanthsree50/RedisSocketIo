const config = require('../config');
const redis = require('redis');
const express = require('express');
const app  = express();

var Client = redis.createClient(config.redis_port,config.redis_host);

var get = (key) => {
    return new Promise((resolve,reject) => {
    Client.get(key,(err,data) => {
        if(err) reject(err);
        resolve(data);
    })
    })
}

var hgetall = (key) => {
    return new Promise((resolve,reject) => {
        if(key === null) reject();
        Client.hgetall(key,(err,data) => {
            if(err) reject(err);
            resolve(data);
        })
    })
}

var lrange = (key) => {
    return new Promise((resolve,reject) => {
        Client.lrange(key,[0,-1],(err,data) => {
if(err) reject(err);
resolve(data);
        })
    })
}

module.exports.get = get;
module.exports.hgetall = hgetall;
module.exports.lrange = lrange;
module.exports.Client = Client;