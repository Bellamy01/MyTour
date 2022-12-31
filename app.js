/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');

//Utils and Controllers
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

//Routes

const tourRouter = require('./routers/tourRoutes');
const userRouter = require('./routers/userRoutes');

const app = express();

//1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

//3)ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  /* const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.status = 'fail';
  err.statusCode = 404; */

  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
