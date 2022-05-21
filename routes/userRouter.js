const express= require('express');
const {getUser,getUsers,createUser,deleteUser,updateUser} = require('../controllers/userControllers');

const router = express.Router();

router
    .route('/')
    .get(getUsers)
    .post(createUser);

router
    .route('/:id')
    .patch(updateUser)
    .get(getUser)
    .delete(deleteUser );

module.exports = router;  
