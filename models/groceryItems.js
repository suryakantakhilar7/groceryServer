const mongoose = require('mongoose');
//const groceryCategory = require("./groceryCategory");
const GrocerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  grocerytype:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "groceryCategory",
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