var express = require('express');
var session = require('express-session');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var userRouter = require('./routers/pet');
var registerRouter = require('./routers/register');
var authRouter = require('./routers/auth');
var passport = require('../strategies/userStrategy');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use( express.static( 'public' ));

app.use(session({
   secret: 'secret',
   key: 'user',
   resave: 'true',
   saveUninitialized: false,
   cookie: { maxage: 60000, secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/routers', userRouter);
app.use('/auth', authRouter);
app.use('/register', registerRouter);

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
app.listen('8080', function(){
  console.log('listening on 8080');
});
