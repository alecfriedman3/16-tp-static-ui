var express = require('express');
var router = express.Router();

var Day = require('../../models/day');
var Activity = require('../../models/activity');
var Restaurant = require('../../models/restaurant');
var Hotel = require('../../models/hotel');
var Place = require('../../models/Place');
var Promise = require('bluebird');


router.get('/count', function (req, res, next ){
  Day.findAll({})
  .then(function (days){
    res.json(days.length)
  })
})

router.post('/count', function (req, res, next ){
  console.log('this is the route we want', req.body)
  Day.create({
    whichDay: req.body.day
  })
  .then (function (day){
    res.end()
  }).catch(next)
})

router.delete('/count', function (req, res, next ){
  console.log('this is the route we want', req.body)
  Day.destroy({
    whichDay: req.body.day
  })
  .then (function (day){
    res.end()
  }).catch(next)
})



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

router.post('/:dayNum/restaurant', function(req, res,next){
  Day.findOne({
    where: {
      whichDay: req.body.day
    }
  })
  .then(function (day){
    Restaurant.findById(req.body.id)
    .then(function(restaurant){
      day.addRestaurant(restaurant).then(function(){
        res.end()
      })
    })
  })
})

router.post('/:dayNum/activity', function(req, res,next){
  Day.findOne({
    where: {
      whichDay: req.body.day
    }
  })
  .then(function (day){
    Activity.findById(req.body.id)
    .then(function(activity){
      day.addActivity(activity).then(function(){
        res.end()
      })
    })
  })
})

router.post('/:dayNum/hotel', function(req, res,next){
  Day.findOne({
    where: {
      whichDay: req.body.day
    }
  })
  .then(function (day){
    Hotel.findById(req.body.id)
    .then(function(hotel){
      day.setHotel(hotel).then(function(){
        res.end()
      })
    })
  })
})






router.delete('/:dayNum/restaurant', function(req, res,next){
  Day.findOne({
    where: {
      whichDay: req.body.day
    }
  })
  .then(function (day){
    Restaurant.findById(req.body.id)
    .then(function(restaurant){
      day.removeRestaurant(restaurant).then(function(){
        res.end()
      })
    })
  })
})

router.delete('/:dayNum/activity', function(req, res,next){
  Day.findOne({
    where: {
      whichDay: req.body.day
    }
  })
  .then(function (day){
    Activity.findById(req.body.id)
    .then(function(activity){
      day.removeActivity(activity).then(function(){
        res.end()
      })
    })
  })
})

router.delete('/:dayNum/hotel', function(req, res,next){
  Day.findOne({
    where: {
      whichDay: req.body.day
    }
  })
  .then(function (day){
    Hotel.findById(req.body.id)
    .then(function(hotel){
      day.setHotel(null).then(function(){
        res.end()
      })
    })
  })
})
module.exports = router;
