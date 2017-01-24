var express = require('express');
var path = require('path');
var passport = require('passport');
var router = express.Router();

router.get('/', function(req, res){
  if(req.isAuthenticated()){
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

router.post('/', passport.authenticate('local'), function(req, res) {
    res.sendStatus(200);
});

module.exports = router;
