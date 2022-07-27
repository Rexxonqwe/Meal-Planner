const mongoose = require('mongoose');
const Meal = require('./mealModel');

const userSchema = new mongoose.Schema({
  name: String,
  calorieRequirement: Number,
  mealPlan: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Meal',
    },
  ],
});

userSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'mealPlan',
  });
  next();
});

const User = new mongoose.model('User', userSchema);
module.exports = User;
