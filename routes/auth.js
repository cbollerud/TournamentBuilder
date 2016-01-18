"use strict";

var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../config');


/* GET authorization token */
router.get('/token', function (req, res, next) {
    //res.send('ask and you shall receive a token');

    var token = jwt.sign({roles:['admin']},config.authentication.secret, {
        expireInMinutes: 1440
    })

    res.json({
        success: true,
        message: 'Your token delivered.',
        token: token
    })

});

module.exports = router;

