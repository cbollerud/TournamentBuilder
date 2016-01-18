"use strict";

var express = require('express');
var config = require('../config');
var jwt = require('jsonwebtoken');
var router = express.Router();
var couchUpsert = require('../couchdb/upsert')
var couchDelete = require('../couchdb/delete')

/* Validate Token */
router.use(function (req, res, next) {
    var header = req.headers.authorization.split(' ');
    var token = null;
    if (header.length == 2) {
        if (/^Bearer$/i.test(header[0])) {
            token = header[1];
        }
    }
    jwt.verify(token, config.authentication.secret, function (err, decoded) {
        if (err) {
            console.error(err);
            res.end('NO NO NO');
        } else {
            if ((decoded.roles && decoded.roles.indexOf('admin')) > -1) {
                next();
            } else {
                res.send("You must be an admin");
            }
        }
    })
});


/* Tournament CRUD Calls */
router.put('/tournaments', function (req, res, next) {
    if (req.body.id && req.body.type && req.body.type === 'soccerseasons') {
        couchUpsert(req.body)
            .then(function () {
                res.statusCode = 204;
                res.end();
            }).catch(function (error) {
            console.error(error);
            res.statusCode = 500;
            res.end();
        })
    }
    else {
        res.statusCode = 400;
        res.end("Invalid doc");
    }
});

router.delete('/tournaments/:id', function (req, res, next) {
    couchDelete('soccerseasons', req.params.id)
        .then(function () {
            res.statusCode = 204;
            res.end();
        }).catch(function (error) {
        console.error(error);
        res.statusCode = 500;
        res.end();
    })
});


/* Games CRUD Calls */
router.put('/games', function (req, res, next) {
    if (req.body.id && req.body.type && req.body.type === 'fixtures') {
        couchUpsert(req.body)
            .then(function () {
                res.statusCode = 204;
                res.end();
            }).catch(function (error) {
            console.error(error);
            res.statusCode = 500;
            res.end();
        })
    } else {
        res.statusCode = 400;
        res.end("Invalid doc");
    }
});

router.delete('/games/:id', function (req, res, next) {
    couchDelete('fixtures', req.params.id)
        .then(function () {
            res.statusCode = 204;
            res.end();
        }).catch(function (error) {
        console.error(error);
        res.statusCode = 500;
        res.end();
    })
});


/* Teams CRUD Calls */
router.put('/teams', function (req, res, next) {
    if (req.body.id && req.body.type && req.body.type === 'teams') {
        couchUpsert(req.body)
            .then(function () {
                res.statusCode = 204;
                res.end();
            }).catch(function (error) {
            console.error(error);
            res.statusCode = 500;
            res.end();
        })
    } else {
        res.statusCode = 400;
        res.end("Invalid doc");
    }

});

router.delete('/teams/:id', function (req, res, next) {
    couchDelete('teams', req.params.id)
        .then(function () {
            res.statusCode = 204;
            res.end();
        }).catch(function (error) {
        console.error(error);
        res.statusCode = 500;
        res.end();
    })
});


module.exports = router;
