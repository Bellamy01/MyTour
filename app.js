/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

//Utils and Controllers
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

//Routes

const tourRouter = require('./routers/tourRoutes');
const userRouter = require('./routers/userRoutes');

const app = express();

//1) MIDDLEWARES

//security http headers
app.use(helmet());

//devlopment logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//limit request from  same api
const limiter = rateLimit({
  max: 100,
  windowMs: 3600000,
  message: 'Too many request from this IP, Please try again in an hour!!',
});

app.use('/api', limiter);

//body parser , reading data from the body into req.body
app.use(express.json({ limit: '10Kb' }));

//serving static files
app.use(express.static(`${__dirname}/public`));

//3)ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
