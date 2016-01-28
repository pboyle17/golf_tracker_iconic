var express = require('express');
var router = express.Router();
var golfer = require('../models/Golfer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to Golf Tracker!',
            description: 'an simple golf tracking applictaion incorporating shot value to help golfers understand how well a  given shot was executed based on millions of data points recorded from pga tour golf tournaments'
 });
});

router.get('/new_round',function(req,res){
  res.render('new_round', {
    greeting:'Hello, welcome to golf tracker, where would you like to play golf?',
    user:'Paul Boyle'
  });
});

router.post('/',function(req,res){
  golfer.create(function(err,golfer){
    if(err){
      console.log(err);
    } else {
      res.render('post');
    }
  })
});

module.exports = router;
