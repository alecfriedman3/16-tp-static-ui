var express = require('express');
var router = express.Router();

var Day = require('../../models/day');
var Activity = require('../../models/activity');
var Restaurant = require('../../models/restaurant');
var Hotel = require('../../models/hotel');
var Place = require('../../models/Place');
var Promise = require('bluebird');

router.get('/:dayNum', function(req, res, next) {
  Day.findOne({
    where: {
      whichDay: req.params.dayNum
    },
    include: [
      {
        model: Activity,

             include: [
          { model: Place}
        ]},
          // through: {
          //   // attributes: ['name', 'age_range']
          // }
      { model: Restaurant,
        include: [
          { model: Place}
        ]},
       { model: Hotel,
             include: [
          { model: Place}
        ]},
    ]
  })
  .then(function(result) {
    res.json(result);
  })
  .catch(next);

});

module.exports = router;
