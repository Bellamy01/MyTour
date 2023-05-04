/* eslint-disable no-console */
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Tour = require('../../models/tourModel');
const User = require('../../models/userModel');
const Review = require('../../models/reviewModel');

dotenv.config({ path: './config.env' });

console.log(process.argv[2]);

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful!'));
// READ JSON FILE
const tourPath = path.join(__dirname, 'tours.json');
const userPath = path.join(__dirname, 'users.json');
const reviewsPath = path.join(__dirname, 'reviews.json');

const tours = JSON.parse(fs.readFileSync(tourPath, 'utf-8'));
const users = JSON.parse(fs.readFileSync(userPath, 'utf-8'));
const reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf-8'));

//IMPORT DATA INTO THE DB
const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log('Data successfully loaded...');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
//DELETE ALL DATA FROM DB

const deleteData = async () => {
  try {
    await Tour.deleteMany({});
    await User.deleteMany({});
    await Review.deleteMany({});
    console.log('Data successfully deleted...');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
