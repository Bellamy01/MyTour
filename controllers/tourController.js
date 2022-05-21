const express = require('express');
const fs = require('fs');
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.checkID  = (req,res,next,val)=>{
    const id = req.params.id*1;
    console.log(`Tour id is: ${val}`);

    if(id> tours.length){
        return res.status(404).json({
            status:"fail",
            message:"Invalid tour ID"
        });
    }
    next();
}

exports.getTours=(req,res)=>{
    console.log(req.requestTime);
    res.status(200).json({//ok
        status:'success',
        requestedAt:req.requestTime,
        results: tours.length,
        data:{
            tours
        }
    });
};
exports.getTour=(req,res)=>{
    console.log(req.params);
    const tour = tours.find( el=> el.id === id);
    
    res.status(200).json({
        status:"success",
        data:{
            tours
        }
    });
};
exports.createTour=(req,res)=>{
    //console
    const newId  = tours[tours.length - 1].id +1;
    const newTour = Object.assign({id:newId},req.body);


    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err =>{
        res.status(201).json({//201 = created
            status:"success",
            data:{
                tour: newTour
            }
        });
    });
    console.log(req.body);
};
exports.updateTour=(req,res)=>{

    
    
    res.status(200).json({
        status:"success",
        data:{
            tour:'<Updated tour baby...!!!!'
        }
    })
};
exports.deleteTour=(req,res)=>{

    const id = req.params.id *1;
    
    res.status(200).json({
        status:"success",
        data:null
    })
};