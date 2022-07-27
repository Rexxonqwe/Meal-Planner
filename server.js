const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { Logger } = require('mongodb');
dotenv.config({ path: './config.env' });
const app = require('./app');

const port = process.env.PORT || 3000;
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
    console.log('DB connection successful!');
  });

const server = app.listen(port, () => {
  console.log(`App is connected to port : ${port}`);
});
