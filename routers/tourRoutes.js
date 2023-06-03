const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');

const {
  aliasTop5Tours,
  getAllTours,
  getMonthlyPlan,
  getTourStats,
  createTour,
  getTour,
  getToursWithin,
  updateTour,
  deleteTour,
} = require('../controllers/tourController');

const reviewRouter = require('./reviewRoutes');

const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);

router.route('/top-5-cheap').get(aliasTop5Tours, getAllTours);

router
  .route('/tours-within/:distance/center/:latlong/unit/:unit')
  .get(getToursWithin);

router
  .route('/get-monthly-plan/:year')
  .get(protect, restrictTo('admin', 'lead-guide', 'guide'), getMonthlyPlan);

router.route('/tour-stats').get(getTourStats);

router
  .route('/')
  .get(getAllTours)
  .post(protect, restrictTo('admin', 'lead-guide'), createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(protect, restrictTo('admin', 'lead-guide'), updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

module.exports = router;
