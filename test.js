const express = require('express');
const fs = require('fs');
let id;
const app = express();

app.use(express.json());   

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`,"utf-8"))

app.get('/api/v1/tours',(req,res)=>{
    res
    .status(200)
    .json({
        status:'success',
        results:tours.length,
        data:{
            tours
        }
    });

})

app.get(`/api/v1/tours/${id}`,(req,res)=>{
    if(req.params.id == tours.map(el=>el.id)){
        
    }
})

app.post('/api/v1/tours',(req,res)=>{
    const newId = tours[tours.length-1].id +1;
    const newTour = Object.assign({id:newId},req.body);

    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
        res.status(201).json({
            status:'success',
            data:{
                tours : newTour
            }
        })
    })

    res.send(newTour);
});

const port = 3000;
app.listen(port,()=>{
    console.log(`Listening on port ${port}...`);
})
