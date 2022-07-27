const mongoose = require('mongoose');
const FoodItems = require('./foodItemsModel');

// schema for optimised meal
const mealSchema = new mongoose.Schema({
  name: String,
  category: {
    type: String,
    enum: ['Breakfast', 'Lunch', 'Evening Snack', 'Dinner'],
    default: 'Lunch',
  },
  calories: {
    type: Number,
    // calories should be multiple of 100.
    validate: {
      validator: function (val) {
        if (val % 100 == 0) {
          return true;
        }
        return false;
      },
      message: 'Calories should be multiple of 100',
    },
  },
  itemsQuantity: {
    type: Number,
    // must be a whole number
    validate: {
      validator: function (val) {
        return val.match(/^d+$/);
      },
    },
  },
  foodItems: [
    {
      type: mongoose.Schema.ObjectId,
      ref: FoodItems,
      required: [true, 'Meal must contain food items!'],

      // Meal atlest contains 2 and maximum 5 fooditems
      validate: {
        validator: function (val) {
          if (this.foodItems.length < 2 || this.foodItems.length > 5)
            return false;
          return true;
        },
        message: 'min 2 and max 5 foodItems!',
      },
    },
  ],
  amountOfProtein: {
    type: Number,
  },
});

// The amount of protein (1g protein has 4 calories) is 20-30% by weight of the total calories.

mealSchema.pre('save', function (next) {
  this.amountOfProtein = this.calories / 4;
  next();
});

mealSchema.pre(/^find/, function (next) {
  // this.populate({
  //   path: 'foodItems',
  //   select: 'name',
  // });

  next();
});

const Meal = new mongoose.model('Meal', mealSchema);
module.exports = Meal;

//url : 127.0.0.1:3000/api/v1/meals/

/*
req body ==> 
{
    "name" : "Light Dinner",
    "foodItems" : ["62dcca902d7615023e1d05ff", "62dcca902d7615023e1d0601"],
    "category" : "Dinner",
    "calories" : 300
}
*/

/*
res you will get back ==>
{
    "status": "success",
    "data": {
        "meal": {
            "name": "Light Dinner",
            "category": "Dinner",
            "calories": 300,
            "itemsQuantity" : 2,
            "foodItems": [
                "62dcca902d7615023e1d05ff",
                "62dcca902d7615023e1d0601"
            ],
            "_id": "62e10b0ffea333bb3bb96837",
            "amountOfProtein": 75,
            "__v": 0
        }
    }
}
*/
