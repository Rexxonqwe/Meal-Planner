const express = require('express');
const userController = require('../controllers/userController');
const mealRouter = require('./mealsRoute');
const router = express.Router();

// use this api to create mealPlan for user.
//url will look like : /api/v1/users/:userId.
router.route('/:userId').post(userController.createMealPlan);

//to create user and get all user.
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

module.exports = router;
