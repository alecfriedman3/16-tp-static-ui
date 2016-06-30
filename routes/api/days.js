var express = require('express');
var router = express.Router();

var Day = require('../../models/day');
var Activity = require('../../models/activity');
var Restaurant = require('../../models/restaurant');
var Hotel = require('../../models/hotel');
var Promise = require('bluebird');

router.get('/:dayNum', function(req, res, next) {
  Day.findOne({
    where: {
      whichDay: req.params.dayNum
    },
    include: [
    {
      model: Activity,
        // through: {
        //   // attributes: ['name', 'age_range']
        // }
     },
     { model: Restaurant},
     { model: Hotel}
   ]
  })
  .then(function(result) {
    res.json(result);
  })
  .catch(next);

});

module.exports = router;
