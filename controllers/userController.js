const User = require('../models/userModel');

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      calorieRequirement: req.body.calorieRequirement,
      mealPlan: req.body.mealPlan,
    });
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      error: err.stack,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: 'success',
      nResults: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      error: err.stack,
    });
  }
};

// THIS WILL CREATE AND UPDATE MEAL PLAN.
exports.createMealPlan = async (req, res) => {
  try {
    const userId = req.params.userId;
    // const newMealPlan = {
    //   mealPlan: req.body.mealPlan,
    // };

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { mealPlan: req.body.mealPlan } },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      error: err.stack,
    });
  }
};

exports.deleteMealPlan;
