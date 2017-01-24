var express = require('express');
var router = express.Router();
var path = require('path');

var UserSchema = require('../models/user');


router.post('/', function(req, res) {
  var sentUser = req.body;

  UserSchema.create(sentUser, function(err, response) {
    if(err){
      next(err);
    }else{
      res.status(201).send({message: "new user created successfully"});
    }
  });
});

module.exports = router;
