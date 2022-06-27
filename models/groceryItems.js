const mongoose = require('mongoose');
const GrocerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  grocerytype:{
    /*There are three user types Admin, customer, delivery 
    1- Grocery,
    2- Vegetable,
    3- Non Veg
    */
    type: Number,
    required: true
  },
  price:{
    type:Number,
    required:true
  },
  unit:{
    type:String
  }

});

module.exports = Grocery = mongoose.model('grocery', GrocerySchema);