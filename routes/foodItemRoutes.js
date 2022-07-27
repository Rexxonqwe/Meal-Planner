const express = require('express');
const foodItemController = require('./../controllers/foodItemController');
router = express.Router();

router.route('/').post(foodItemController.createFoodItems);
module.exports = router;
