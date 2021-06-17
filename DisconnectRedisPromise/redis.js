const config = require('../config.js'),
redis = require('redis');

var Client = redis.createClient(config.redis_port,config.redis_host);

var promiser = (resolve,reject) => {
return (err,data) => {
    if(err) reject(err);
    resolve(data);
};
};

var storeUser = (SocketID,user) => {
    return new Promise((resolve,reject) => {
Client.setex(SocketID,config.expire,user,promiser(resolve,reject));
    });
};

var getUser = (SocketID) => {
return new Promise((resolve,reject) => {
    Client.get(SocketID,promiser(resolve,reject));
});
};

module.exports.storeUser = storeUser;
module.exports.getUser = getUser;