/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');

const app = express();
//Routes

const tourRouter = require('./routers/tourRoutes');
const userRouter = require('./routers/userRoutes');

//1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Request Sent Succesfully...');
  next();
});
//3)ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
