var express = require('express');
var router = express.Router();
var ChartClass = require('chart.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', Chart: ChartClass, P: x});
});

module.exports = router;
