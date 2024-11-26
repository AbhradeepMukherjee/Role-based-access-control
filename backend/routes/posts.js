const express = require('express');
const postController = require('../controllers/postController');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

const router = express.Router();

//get all posts
router.get('/', authenticate, postController.getAllPosts);

//create a new post
router.post('/', authenticate, authorize(['Admin', 'Editor']), postController.createPost);

//delete a post
router.delete('/:id', authenticate, authorize(['Admin']), postController.deletePost);

module.exports = router;
