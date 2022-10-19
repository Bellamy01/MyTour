const express = require('express');
const fs = require('fs');

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

app.post('/api/v1/tours',(req,res)=>{
    const newId = tours[tours.length-1].id +1;
    const newTour = Object.assign({id:newId},req.body);

    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,tours,"utf-8",err=>{
        if(err){
            res.send(err.message);
        }
    })

    res.send(newTour);
});

const port = 3000;
app.listen(port,()=>{
    console.log(`Listening on port ${port}...`);
})
