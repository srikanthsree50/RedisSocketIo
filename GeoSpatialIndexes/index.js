const express = require('express');
const process = require('process');
const redis = require('./redis');

var app = express();

redis.Client.flushall();

redis.Client.geoadd('places',86.2520,41.6764,"South Bend");

redis.Client.geoadd('places',85.9767,41.6820,"Elkhart");

redis.Client.geoadd('places',87.6298,41.8781,"Chicago");

app.get('/aroundsb/:miles',(req,res) => {
    redis.aroundSB(parseInt(req.params.miles))
    .then((data) => res.send(data));
});



app.get('/around/:long/:lat/:miles',(req,res) => {
    redis.aroundLoc(req.params.long,req.params.lat,parseInt(req.params.miles))
    .then((data) => res.send(data));
});

app.listen(process.argv[2]);