const fs = require('fs');
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`,"utf-8")
);

exports.checkId = (req,res,next,val)=>{
    console.log(`Tour id is: ${val}`);
    const tour = tours.find(el=>el.id == req.params.id);
    if(!tour){
        return res.status(404).json({
            status:'failure',
            message:'Invalid ID'
        });
    }
    next();
}

exports.getAllTours = (req,res)=>{
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
exports.getTour = (req,res)=>{
    console.log(req.params);
    const tour = tours.find(el=>el.id == req.params.id);
    const id = parseInt(req.params.id); 
    res.status(200).json({
        status:'success',
        data:{
            tour
        }
    });
};

exports.createTour = (req,res)=>{
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

exports.updateTour = (req,res)=>{
    const id = parseInt(req.params.id);
    res.status(200).json({
        status:'success',
        data:{
            tour: '<Updated tour...>'
        }
    });
};

exports.deleteTour = (req,res)=>{
    const id = parseInt(req.params.id);
    res.status(204).json({
        status:'success',
        data:null
    })
};