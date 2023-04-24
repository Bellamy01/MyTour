const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router({ mergeParams: true });
const {
  getAllReviews,
  createReview,
} = require('../controllers/reviewController');

router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), createReview);

module.exports = router;
