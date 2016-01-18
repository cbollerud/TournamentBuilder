"use strict";

var config = require('../config');
var read = require('./read');
var http = require('http');
var Promise = require('bluebird');

function CouchDBOptions(path) {
    this.path = path;
    this.method = 'DELETE';
    this.hostname = config.database.host;
    this.port = config.database.port;
}

var upsert = function (type, id) {
    return new Promise(function (resolve, reject) {
        read(type, id)
            .then(function (result) {
                var key = type + '_' + id;
                var path = '/' + config.database.name + '/';
                var rev;

                result = JSON.parse(result);

                if(result._rev) {
                    rev = result._rev;
                } else {
                    resolve("Does not exist");
                    return;
                }

                var options = new CouchDBOptions(path + key + '?rev=' + rev);

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
            }).catch(function(error){
            console.error(error);
            reject(error);
        })
    });
}

module.exports = upsert;
