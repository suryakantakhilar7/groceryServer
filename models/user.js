const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: Number
  },
  usertype:{
    /*There are three user types Admin, customer, delivery 
    1- Admin,
    2- customer,
    3- delivery
    */
    type: Number,
    required: true
  }

});

module.exports = User = mongoose.model('user', UserSchema);