const mongoose = require('mongoose');
const GroceryCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  active:{
    type: Boolean,
    default: true
  }

});

module.exports = GroceryCategory = mongoose.model('groceryCategory', GroceryCategorySchema);