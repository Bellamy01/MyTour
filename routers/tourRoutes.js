const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router();
const {
  aliasTop5Tours,
  getAllTours,
  getMonthlyPlan,
  getTourStats,
  createTour,
  getTour,
  updateTour,
  deleteTour,
} = require('../controllers/tourController');
const { createReview } = require('../controllers/reviewController');

router.route('/top-5-cheap').get(aliasTop5Tours, getAllTours);

router.route('/get-monthly-plan/:year').get(getMonthlyPlan);

router.route('/tour-stats').get(getTourStats);

router
  .route('/')
  .get(protect, restrictTo('admin', 'lead-guide'), getAllTours)
  .post(createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

router
  .route('/:tourId/reviews')
  .post(protect, restrictTo('user'), createReview);

module.exports = router;
