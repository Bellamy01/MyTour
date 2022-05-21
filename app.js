//node-tools
const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRouter.js');
const userRouter = require('./routes/userRouter.js');


const app = express();
/*----------------middleware----------*/
app.use(express.json());
app.use(morgan('dev'));


app.use((req,res,next)=>{
    console.log('Hello from the middleware 😂');
    next();
});
app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString();
    next();
})

  

/*---------routes-handlers----------- */

/* -----------users--------------- */

/*----------tours-------------*/

/* ------route----- */
// app.get('/api/v1/tours',getTours);
// app.get('/api/v1/tours/:id',getTour);
// app.post('/api/v1/tours',createTour);
// app.patch('/api/v1/tours/:id',updateTour);
// app.delete('/api/v1/tours/:id',deleteTour);

/*-----routes--------*/


app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);


module.exports = app;