// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var user_classSchema = mongoose.Schema({

    local            : {
        user_id    : String,
        class_id   : String,
    }
});


// create the model for users and expose it to our app
module.exports = mongoose.model('User_Class', user_classSchema);
