const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

//register users
router.post('/register', authController.register);
  
//login users
router.post('/login', authController.login);

//logout users
router.post('/logout', authController.logout);

//verify email
router.post('/verify-email', authController.verifyEmail);

//generate otp
router.post('/generate-otp', authController.generateOtp);

//reset password
router.post('reset-password', authController.resetPassword);

module.exports = router;