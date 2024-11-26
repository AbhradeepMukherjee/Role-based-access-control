const express = require('express');
const authenticate = require('../middlewares/authenticate.js');
const authorize = require('../middlewares/authorize.js');
const userController = require('../controllers/userController.js');

const router = express.Router();

//change the role of a user (Admin only)
router.patch('/role/:id', authenticate, authorize(['Admin']), userController.updateUserRole);

//get all the users (Admin only)
router.get('/', authenticate, authorize(['Admin']), userController.getUsers);

//change password
router.put('/', authenticate, userController.changePassword);

module.exports = router;
