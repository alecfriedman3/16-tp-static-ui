var express = require('express');
var router = express.Router();
var Hotel = require('../../models/hotel');
var Restaurant = require('../../models/restaurant');
var Activity = require('../../models/activity');
var Place = require('../../models/place');
var Promise = require('bluebird');

router.get('/', function(req, res, next) {

  var findingHotels = Hotel.findAll({
    include: [Place]
  });

  var findingActivities = Activity.findAll({
    include: [Place]
  });

  var findingRestaurants = Restaurant.findAll({
    include: [Place]
  });

  Promise.all([
    findingHotels,
    findingActivities,
    findingRestaurants
  ])
  .spread(function(hotels, activities, restaurants) {
    res.json({
      hotel: hotels,
      restaurant: restaurants,
      activity: activities
    });
  })
  .catch(next);

});

module.exports = router;
