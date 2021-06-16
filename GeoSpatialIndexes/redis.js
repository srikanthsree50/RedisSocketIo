const config = require('../config');

const redis = require('redis');

var Client = redis.createClient(config.redis_port,config.redis_host);

var promiser = (resolve,reject) => {
    return (err,data) => {
if(err) reject(err);
resolve(data);
    };
}

var aroundLoc = (long,lat,miles) => {
    return new Promise((resolve,reject) => {
Client.georadius('places',long,lat,miles,'mi','WITHDIST',promiser(resolve,reject));
    });
}


var aroundSB = (miles) => {
    return new Promise((resolve,reject) => {
Client.georadiusbymember('places','South Bend',miles,'mi','WITHDIST',promiser(resolve,reject));
    });
}

module.exports.aroundLoc = aroundLoc;
module.exports.aroundSB = aroundSB;
module.exports.Client = Client; 
