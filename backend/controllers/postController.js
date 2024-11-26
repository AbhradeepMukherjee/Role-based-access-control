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
      const post = new BlogPost({ title, content, author: req.user._id });
      await post.save();
      res.status(201).json(post);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

const deletePost = async (req, res) => {
    try {
      const post = await BlogPost.findByIdAndDelete(req.params.id);
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