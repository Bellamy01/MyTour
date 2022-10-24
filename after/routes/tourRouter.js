const express= require('express');
/*const tourController = require('./../controllers/tourController'); */
const router = express.Router();

const {checkID,getTours,getTour,createTour,updateTour,deleteTour} = require('./../controllers/tourController');
router.param('id',checkID);
/* or you can just start with tourController.getTours...etc */

router
    .route('/')
    .get(getTours)
    .post(createTour);

router
    .route('/:id')
    .patch(updateTour)
    .get(getTour)
    .delete(deleteTour);

module.exports = router;