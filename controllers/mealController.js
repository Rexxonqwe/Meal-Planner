const Meal = require('../models/mealModel');

exports.createMeal = async (req, res) => {
  try {
    const newMeal = await Meal.create({
      name: req.body.name,
      category: req.body.category,
      calories: req.body.calories,
      foodItems: req.body.foodItems,
    });
    res.status(201).json({
      status: 'success',
      data: {
        meal: newMeal,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      error: err,
    });
  }
};

exports.getAllMeals = async (req, res) => {
  try {
    const meals = await Meal.find();
    res.status(200).json({
      status: 'success',
      nResults: meals.length,
      data: {
        meals,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      error: err,
    });
  }
};

// This can be used to update the meal's fooditmes.
exports.updateMeal = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedMeal = await Meal.findByIdAndUpdate(
      { _id: id },
      { $push: { foodItems: req.body.foodItems } },
      {
        new: true,
        // runValidators: true,
      }
    );
    res.status(200).json({
      status: 'success',
      data: {
        meals: updatedMeal,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      error: err.stack,
    });
  }
};
