var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'home',keywords:'index keywords',description:'description of home' });
});

module.exports = router;
