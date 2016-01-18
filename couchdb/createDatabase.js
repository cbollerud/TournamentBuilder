"use strict";

var config = require('./../config');
var http = require('http');
var fs = require('fs');

var couchDBExists = {
    path: '/' + config.database.name,
    method: 'GET',
    hostname: config.database.host,
    port: config.database.port
};

function CouchDBOptions(designID) {
    this.path = '/' + config.database.name;
    if (designID) {
        this.path = this.path + '/' + designID;
    }
    this.method = 'PUT';
    this.hostname = config.database.host;
    this.port = config.database.port;
}

http.request(couchDBExists, function (response) {

    if (response.statusCode === 404) {
        console.log("Database does not exist ... creating " + config.database.name)

        var couchDBCreate = new CouchDBOptions();
        http.request(couchDBCreate, function (response) {
        }).on('error', function (error) {
            console.error(error);
        }).end();

        fs.readFile(__dirname + '/views/fixtures.json', function (error, data) {
            if (error) {
                console.error(error);
            } else {
                var doc = JSON.parse(data.toString());
                var couchDBCreate = new CouchDBOptions(doc._id);
                var db = http.request(couchDBCreate, function (response) {
                }).on('error', function (error) {
                    console.error(error);
                });
                db.write(data);
                db.end();
            }
        });

        fs.readFile(__dirname + '/views/teams.json', function (error, data) {
            if (error) {
                console.error(error);
            } else {
                var doc = JSON.parse(data.toString());
                var couchDBCreate = new CouchDBOptions(doc._id);
                var db = http.request(couchDBCreate, function (response) {
                }).on('error', function (error) {
                    console.error(error);
                });
                db.write(data);
                db.end();
            }
        });

    }

}).on('error', function (error) {
    console.error(error);
}).end();







