var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var userRouter = require('./routers/pet');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/routers', userRouter);
app.use( express.static( 'public' ));



//server
app.listen('3000', function(){
  console.log('listening on 3000');
});
