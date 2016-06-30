var Sequelize = require('sequelize');
var db = require('./_db');

var Day = db.define('day', {
  whichDay: Sequelize.INTEGER
});

module.exports = Day;
