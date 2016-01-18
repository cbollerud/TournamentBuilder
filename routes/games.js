"use strict";

var express = require('express');
var router = express.Router();
var couchdbView = require('../couchdb/view');

/* GET upcoming games. */
router.get('/', function (req, res, next) {
    couchdbView('fixtures','upcoming').then(function (result) {
        res.json(JSON.parse(result));
    }).catch(function (error) {
        res.send('error in request');
    })
});

/* GET past games. */
router.get('/past', function (req, res, next) {
    couchdbView('fixtures','past').then(function (result) {
        res.json(JSON.parse(result));
    }).catch(function (error) {
        res.send('error in request');
    })
});

module.exports = router;
