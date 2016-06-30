var express = require('express');
var router = express.Router();

router.use('/attractions', require('./attractions'));
router.use('/days', require('./days'));


module.exports = router;
