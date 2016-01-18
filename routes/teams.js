"use strict";

var express = require('express');
var router = express.Router();
var couchdbRead = require('../couchdb/read');
var couchdbView = require('../couchdb/view');

/* GET team listing. */
router.get('/', function (req, res, next) {
    couchdbView('teams', 'list').then(function (result) {
        res.json(JSON.parse(result));
    }).catch(function (error) {
        res.send('error in request');
    })
});

/* GET team detail. */
router.get('/:id', function (req, res, next) {
    couchdbRead('teams', req.params.id).then(function (result) {
        res.json(JSON.parse(result));
    }).catch(function (error) {
        res.send('error in request');
    })
});

module.exports = router;

