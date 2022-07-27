//This script is used to upload to mongoDB
//IT IS NOT USED IN APPLICATION.

const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const foodItem = require('../models/foodItemsModel');
const FoodItem = require('../models/foodItemsModel');

dotenv.config({ path: './config.env' });

const foodItems = JSON.parse(
  fs.readFileSync(`./dev-data/foodItems.json`, 'utf-8')
);

const importFood = async () => {
  try {
    await FoodItem.create(foodItems);
    console.log('Data loaded successfully!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successfull!');
  });

console.log(process.argv);
if (process.argv[2] == '--import') {
  importFood();
}
