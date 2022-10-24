const express = require('express');
const app = express();
const morgan = require('morgan');

//Routes
const tourRouter = require('./routers/tourRoutes');
const userRouter = require('./routers/userRoutes');

//1) MIDDLEWARES

app.use(express.json());  
app.use(morgan('dev'));

app.use((req,res,next)=>{
    console.log('Hello people from the backend...');
    next();
});

app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString();
    next();
})
//3)ROUTES
app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);

module.exports = app;