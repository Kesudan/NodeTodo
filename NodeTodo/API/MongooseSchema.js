var mongoose = require("mongoose");

// NEED TO PREDFINE COMMON DOCUMENT SCHEMAS - Not ideal.. would be better to load a schema from DB surely.. Shall wait and see if this is correct.

//Define schema
var userSchema = new mongoose.Schema({
    Username: String,
    Password: String,
    LoggedIn: Number
});

var todoSchema = new mongoose.Schema({
    Username: String,
    Description: String,
    Date: Date,
    File: String,
    Complete: Boolean
});


var userModel = mongoose.model('User', userSchema, "User");
var todoSchema = mongoose.model('ToDo', todoSchema, "ToDo");


module.exports = {
    "userModel" : userModel,
    "todoModel" : todoSchema
}

