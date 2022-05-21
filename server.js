const app = require('./app');
/*---------port & server-----------*/
const PORT  = process.env.PORT || 2000;

/*------------------server-------------*/
app.listen(PORT,()=>{
    console.log(`App running on port ${PORT}...`);
});  

