const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
   phone_number: String,
   first_name: String,
   last_name: String,
   email: String
});



module.exports = function(name) {
    return mongoose.model(name, UserSchema);
};