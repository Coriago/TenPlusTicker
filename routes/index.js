var express = require('express');
var router = express.Router();
var Charts = require('chart.js');
var x = 5;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', P: x});
});

module.exports = router;
