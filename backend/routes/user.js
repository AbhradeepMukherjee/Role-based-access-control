const express = require('express');
const authenticate = require('../middlewares/authenticate.js');
const authorize = require('../middlewares/authorize.js');
const { updateUserRole } = require('../controllers/userController.js');

const router = express.Router();

//endpoint to change the role of a user (Admin only)
router.patch('/role/:id', authenticate, authorize(['Admin']), updateUserRole);

module.exports = router;
