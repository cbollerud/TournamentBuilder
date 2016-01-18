"use strict";

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var http = require('http');
var config = require('./config');
var app = express();

// Create empty database if it does not exist
require('./couchdb/createDatabase');

app.set('port', config.server.port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('json spaces', 2)

app.use('/', require('./routes/home'));

app.use('/teams', require('./routes/teams'));
app.use('/games', require('./routes/games'));

app.use('/auth', require('./routes/auth'));
app.use('/admin', require('./routes/admin'));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.redirect('/');
});

app.use(function (err, req, res, next) {
    console.error(err);
    res.status(err.status || 500);
    res.end();
});

var server = http.createServer(app);
server.listen(config.server.port);

console.log("Listening on port", config.server.port);
