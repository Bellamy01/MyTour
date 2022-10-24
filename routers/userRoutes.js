const express = require('express');
const router = express.Router();
const {getAllUsers,createUser,getUser,updateUser,deleteUser}= require('../controllers/userController');

router.param('id',(req,res,next,val)=>{
    console.log(`User id is:${val}`);
})

router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

module.exports = router;