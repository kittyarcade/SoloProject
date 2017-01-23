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





module.exports = router;
