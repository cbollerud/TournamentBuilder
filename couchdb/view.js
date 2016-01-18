"use strict";

var config = require('../config');
var http = require('http');
var Promise = require('bluebird');

function CouchDBOptions(design, view, params) {
    this.path = '/' + config.database.name + '/_design/' + design + '/_view/' + view;
    if(params) {
        this.path = this.path + '?' + params;
    }
    this.method = 'GET';
    this.hostname = config.database.host;
    this.port = config.database.port;
}

var read = function (design, view, params) {
    return new Promise(function (resolve, reject) {
        var options = new CouchDBOptions(design, view, params);
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
