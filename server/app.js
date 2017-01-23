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

//database
var mongoURI = "mongodb://localhost:27017/petFavs";
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function (err) {
    console.log('mongodb connection error:', err);
});

MongoDB.once('open', function () {
  console.log('mongodb connection open!');
});

//server
app.listen('3000', function(){
  console.log('listening on 3000');
});
