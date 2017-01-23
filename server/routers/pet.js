var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/favorite');

router.post('/', function(req,res){
    var info = req.body;
    console.log('Post hit:', req.body);
    var postFav = new User ({
      Name: info.name.$t,
      Sex: info.sex.$t,
      Age: info.age.$t,
      Image: info.media.photos.photo[7].$t,
      Description: info.description.$t,
      Contact: info.contact.email.$t
    });
    postFav.save(function(err){
      if(err){
        console.log(err);
        res.sendStatus(500);
      } else {
        res.send('pet faved');
      }
    });
}); //end post

router.get('/', function(req,res){
  console.log('GET route hit');
  User.find({}, function(err, result){
    if(err){
      console.log('GET Broke');
      res.sendStatus(500);
    } else {
      console.log('GET Sent');
      res.send(result);
    }
  });
});//end GET



module.exports = router;
