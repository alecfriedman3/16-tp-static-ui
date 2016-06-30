var express = require('express');
var router = express.Router();
var Hotel = require('../models/hotel');
var Restaurant = require('../models/restaurant');
var Activity = require('../models/activity');
var Place = require('../models/place');
var Promise = require('bluebird');

router.get('/', function(req, res, next) {
  console.log('Routed to INDEX level');
  next();
})

router.get('/', function(req, res, next) {


    res.render('index', {});

});

module.exports = router;
