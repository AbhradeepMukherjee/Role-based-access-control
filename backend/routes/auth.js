const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authController = require('../controllers/authController');
const router = express.Router();

//register users
router.post('/register', authController.register);
  
//login users
router.post('/login', authController.login);

//logout users
router.post('/logout', authController.logout)

module.exports = router;