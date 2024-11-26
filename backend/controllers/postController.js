const Blog = require('../models/Blog.js');
const getAllPosts = async (req, res) => {
    try {
      const posts = await Blog.find().populate('author', 'username');
      res.json(posts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

const createPost = async (req, res) => {
    try {
      const { title, content } = req.body;
      const post = new Blog({ title, content, author: req.user._id });
      await post.save();
      const populatedPost = await Blog.findById(post._id).populate('author', 'username');
      res.status(201).json({post:populatedPost});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

const deletePost = async (req, res) => {
    try {
      const post = await Blog.findByIdAndDelete(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json({ message: 'Post deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllPosts,
    createPost,
    deletePost
}