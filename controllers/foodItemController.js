const FoodItem = require('./../models/foodItemsModel');

exports.createFoodItems = async (req, res, next) => {
  try {
    // const { name, calories, protein, carbs, fat, acceptedUnits, itemWeight } =
    //   req.body.data;
    const newFoodItem = await FoodItem.create({
      name: req.body.name,
      calories: req.body.calories,
      protein: req.body.protein,
      carb: req.body.carbs,
      fat: req.body.fat,
      acceptedUnits: req.body.acceptedUnits,
      itemWeight: req.body.itemWeight,
    });

    res.status(200).json({
      status: 'success',
      data: {
        foodItem: newFoodItem,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      data: {
        error: err.stack,
      },
    });
  }
};
