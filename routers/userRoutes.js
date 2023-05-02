const express = require('express');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updateMyPassword,
  protect,
  restrictTo,
} = require('../controllers/authController');
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
} = require('../controllers/userController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.patch('/updateMyPassword', protect, updateMyPassword);

//Protect all routes after this middleware
router.use(protect);

router.patch('/updateMe', updateMe);
router.delete('/deleteMe', deleteMe);
router.route('/me').get(getMe, getUser);

router.use(restrictTo('admin'));

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
