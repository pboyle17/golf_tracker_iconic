var express = require('express');
var router = express.Router();
var fs = require('fs');
var strokes={};
var putts={};
var golfer = require('../models/Golfer');


fs.readFile('strokes_gained.json',function(err,data){
  if(err){
    console.log(err);
  } else {
    strokes=JSON.parse(data);
    console.dir(strokes);
  }
});

fs.readFile('strokes_gained_putting.json',function(err,data){
  if(err){
    console.log(err);
  } else {
    putts=JSON.parse(data);
    console.dir(putts);
  }
});

router.get('/',function(req,res){
  res.render('api');
});

router.get('/strokes',function(req,res){
  res.send(strokes);
});

router.get('/putts',function(req,res){
  res.send(putts);
});

router.get('/golfers',function(req,res){
  golfer.find(function(err,golfers){
    res.json(golfers);
  });
});

router.post('/golfers',function(req,res){
  golfer.create(req.body, function(err,golfer){
    if(err){
      console.log(err);
    } else {
      res.json(golfer);
    }
  });
});

router.get('/golfers/:id',function(req,res){
    golfer.findById(req.params.id,function(err,golfer){
      if(err){
        console.log(err);
      } else {
        res.json(golfer);
      }
  });
});

router.put('/golfers/:id',function(req,res){
  golfer.findByIdAndUpdate(req.params.id,req.body,function(err,golfer){
    if(err){
      console.log(err);
    } else {
      res.json(golfer)
    }
  });
});

router.patch('/golfers/:id',function(req,res){
  golfer.findByIdAndUpdate(req.params.id,req.body,function(err,golfer){
    if(err){
      console.log(err);
    } else {
      res.json(golfer)
    }
  });
});

router.delete('/golfers/:id',function(req,res){
  golfer.findByIdAndRemove(req.params.id,req.body,function(err,golfer){
    if(err){
      console.log(err);
    } else {
      res.json(golfer);
    }
  });
});

module.exports = router;
