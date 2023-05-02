const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router({ mergeParams: true });
const {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  setTourIds,
  getReview,
} = require('../controllers/reviewController');

router.use(protect);

router
  .route('/')
  .get(getAllReviews)
  .post(setTourIds, restrictTo('user'), createReview);

router
  .route('/:id')
  .get(getReview)
  .patch(restrictTo('user', 'admin'), updateReview)
  .delete(restrictTo('user', 'admin'), deleteReview);

module.exports = router;
