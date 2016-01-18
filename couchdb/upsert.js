"use strict";

var config = require('../config');
var read = require('./read');
var http = require('http');
var Promise = require('bluebird');

function CouchDBOptions(path) {
    this.path = path;
    this.method = 'PUT';
    this.hostname = config.database.host;
    this.port = config.database.port;
}

var upsert = function (doc) {
    return new Promise(function (resolve, reject) {
        read(doc.type, doc.id)
            .then(function (result) {
                var key = doc.type + '_' + doc.id;
                var path = '/' + config.database.name + '/';

                if(result._rev) {
                    doc._rev = result._rev;
                }

                var options = new CouchDBOptions(path + key);

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

                req.write(JSON.stringify(doc));
                req.end();
            }).catch(function(error){
            console.error(error);
            reject(error);
        })
    });
}

module.exports = upsert;
