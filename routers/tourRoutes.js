const express = require('express');

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

router.route('/top-5-cheap').get(aliasTop5Tours, getAllTours);

router.route('/get-monthly-plan/:year').get(getMonthlyPlan);

router.route('/tour-stats').get(getTourStats);

router.route('/').get(getAllTours).post(createTour);

router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
