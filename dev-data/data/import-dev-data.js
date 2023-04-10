/* eslint-disable no-console */
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });

console.log(process.argv[2]);

// READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
//IMPORT DATA INTO THE DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded...');
  } catch (err) {
    console.log(err);
  }
};
//DELETE ALL DATA FROM DB

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted...');
  } catch (err) {
    console.log(err);
  }
};
//using compass
const connectDB = async () => {
  await mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log('DB connection successful!'));
};
const run = async () => {
  await connectDB();
  if (process.argv[2] === '--import') {
    importData();
  } else if (process.argv[2] === '--delete') {
    deleteData();
  }
  process.exit();
};

run();
