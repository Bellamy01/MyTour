const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
//const Honeybadger = require('@honeybadger-io/js');

//Utils and Controllers
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

//Routes

const tourRouter = require('./routers/tourRoutes');
const userRouter = require('./routers/userRoutes');
const reviewRouter = require('./routers/reviewRoutes');
const viewRouter = require('./routers/viewRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//1) MIDDLEWARES

//serving static files
app.use(express.static(path.join(__dirname, 'public')));

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

//Preventing parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

//Data sanization against NOSQL query injection
app.use(mongoSanitize());

//Data sanitization against cross-site scripting attacks(XSS)
app.use(xss());

//APIS
/* 
Honeybadger.configure({
  apiKey: 'hbp_tTICQKgGcgc4e8p4nDf3Cchd2TizE80Wn0MC',
  environment: 'production',
});

Honeybadger.notify('Testing Honeybadger!'); 
*/
//3)ROUTES
app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
