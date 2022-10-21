const express = require('express');
const fs = require('fs');
const app = express();
const morgan = require('morgan');

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
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`,"utf-8")
);
//2)ROUTE HANDLERS
const getAllTours = (req,res)=>{
    console.log(req.requestTime);
    res
    .status(200)
    .json({
        status:'success',
        requestedAt:req.requestTime,
        results:tours.length,
        data:{
            tours
        }
    });
}

const getTour = (req,res)=>{
    console.log(req.params);
    const id = parseInt(req.params.id);
    const tour = tours.find(el=>el.id == req.params.id);

    if(!tour){
        return res.status(404).json({
            status:'failure',
            message:'Invalid ID'
        });
    }
    res.status(200).json({
        status:'success',
        data:{
            tour
        }
    });
};

const createTour = (req,res)=>{
    const newId = tours[tours.length-1].id +1;
    const newTour = Object.assign({id:newId},req.body);

    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
        res.status(201).json({
            status:'success',
            data:{
                tours : newTour
            }
        });
    });

    res.send(newTour);
};

const updateTour = (req,res)=>{
    const id = parseInt(req.params.id);
    const tour = tours.find(el=>el.id == req.params.id);

    if(!tour){
        return res.status(404).json({
            status:'failure',
            message:'Invalid ID'
        })
    }

    res.status(200).json({
        status:'success',
        data:{
            tour: '<Updated tour...>'
        }
    });
};

const deleteTour = (req,res)=>{
    const id = parseInt(req.params.id);
    const tour = tours.find(el=>el.id == req.params.id);

    if(!tour){
        res.status(404).json({
            status:'success',
            message:"Invalid ID"
        })
    }
    res.status(204).json({
        status:'success',
        data:null
    })
};

const getAllUsers = (req,res)=>{
    const users
}
//3)ROUTES
app
    .route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour);

app
    .route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

app
    .route('/api/v1/tours')
    .get(getAllUsers)
    .post(createUser);

app
    .route('/api/v1/users/:id')
    .get(getuser)
    .patch(updateUser)
    .delete(deleteUser);

//4)START SERVER
    const port = 3000;
app.listen(port,()=>{
    console.log(`Listening on port ${port}...`);
})
