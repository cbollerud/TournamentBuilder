"use strict";

var config = require('../config');
var http = require('http');
var Promise = require('bluebird');

function FootballOptions(season, type) {

    this.path = '/v1/soccerseasons/';
    if (season) {
        this.path = this.path + season + '/';
    }
    if (type) {
        this.path = this.path + type + '/';
    }

    this.method = 'GET';
    this.hostname = 'api.football-data.org';
    this.port = 80;
    this.headers = {
        'X-Response-Control': 'minified'
    };
}

var retrieve = function (season, type) {
    return new Promise(function (resolve, reject) {
        var options = new FootballOptions(season, type);
        var req = http.request(options, function (response) {
            var str = '';
            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {
                resolve(JSON.parse(str));
            });
        });
        req.on('error', function (e) {
            reject(e.message);
        });
        req.end();
    });
}

module.exports = retrieve;
