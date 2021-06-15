const config = require('../config');
const redis = require('redis');

var Client = redis.createClient(config.redis_port,config.redis_host);

var promiser = (resolve,reject) => {
    return (err,data) => {
        if(err) reject(err);
        resolve(data);
    }
}

var get = (key) => {
    return new Promise((resolve,reject) => {
    Client.get(key,promiser(resolve,reject));
    })
}

var hgetall = (key) => {
    return new Promise((resolve,reject) => {
        if(key === null) reject();
        Client.hgetall(key,promiser(resolve,reject));
    })
}

var zrevrangebyscore = (key,max,min) => {
return new Promise((resolve,reject) => {
Client.zrevrangebyscore(key,max,min,promiser(resolve,reject));
})
}

module.exports.get = get;
module.exports.hgetall = hgetall;
module.exports.zrevrangebyscore = zrevrangebyscore;
module.exports.Client = Client;