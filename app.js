const express = require('express');

const app = express();
const foodItemRouter = require('./routes/foodItemRoutes');
const mealsRouter = require('./routes/mealsRoute');
const userRouter = require('./routes/userRoute');

app.use(express.json());

app.use('/api/v1/foodItems', foodItemRouter);
app.use('/api/v1/meals', mealsRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
