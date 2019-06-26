var express = require('express');
var router = express.Router();
var Charts = require('chart.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', Chart: Charts });
});

module.exports = router;
