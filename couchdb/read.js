"use strict";

var config = require('../config');
var http = require('http');
var Promise = require('bluebird');

function CouchDBOptions(key) {
    this.path = '/' + config.database.name + '/';
    if (key) {
        this.path = this.path + key + '/';
    }

    this.method = 'GET';
    this.hostname = config.database.host;
    this.port = config.database.port;
}

var read = function (type, id) {
    return new Promise(function (resolve, reject) {
        var key = type + '_' + id;
        var options = new CouchDBOptions(key);
        var req = http.request(options, function (response) {
            var str = '';
            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {
               resolve(str);
            });
        });

        req.on('error', function (e) {
            reject(e.message);
        });

        req.end();
    });
}

module.exports = read;
