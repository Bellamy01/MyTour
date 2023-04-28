const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router({ mergeParams: true });
const {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  setTourIds,
} = require('../controllers/reviewController');

router
  .route('/')
  .get(getAllReviews)
  .post(protect, setTourIds, restrictTo('user'), createReview);

router.route('/:id').patch(updateReview).delete(deleteReview);

module.exports = router;
