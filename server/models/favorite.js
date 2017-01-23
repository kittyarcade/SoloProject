var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
  Name: {type: String, required: true},
  Sex: String,
  Age: Number,
  Image: String
}); //end userSchema

var User = mongoose.model('favorite', userSchema);

module.exports= User;
