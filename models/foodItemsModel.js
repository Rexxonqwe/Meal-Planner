const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    reuired: [true, 'Please enter food name!'],
  },
  calories: Number,
  protein: Number,
  carb: Number,
  fat: Number,
  acceptedUnits: {
    type: String,
    enum: ['ml', 'liter', 'kg', 'g', 'item'],
    default: 'g',
  },
  itemWeight: {
    type: Number,
  },
});

const FoodItem = new mongoose.model('FoodItem', foodItemSchema);
module.exports = FoodItem;
