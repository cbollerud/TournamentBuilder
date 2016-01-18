"use strict";

var config = require('./config');
var http = require('http');
var retrieve = require('./footballdata/retrieve');
var upsert = require('./couchdb/upsert');

// Create empty database if it does not exist
require('./couchdb/createDatabase');

// soccerseasons
retrieve().then(function (results) {
    results.forEach(function (item) {
        item.type = 'soccerseasons';
        upsert(item);
    })
}).catch(function (error) {
    console.error(error);
});


// teams
retrieve(398,'teams').then(function (results) {
    results.teams.forEach(function (item) {
        item.type = 'teams';
        upsert(item);
    })
}).catch(function (error) {
    console.error(error);
});


// fixtures
retrieve(398,'fixtures').then(function (results) {
    results.fixtures.forEach(function (item) {
        item.type = 'fixtures';
        upsert(item);
    })
}).catch(function (error) {
    console.error(error);
});




