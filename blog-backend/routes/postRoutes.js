const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../middlewares/auth');

// @route   POST /api/posts
// @desc    Create a post
// @access  Private
router.post('/', auth, postController.createPost);

// @route   GET /api/posts
// @desc    Get all posts
// @access  Public
router.get('/', postController.getPosts);

// @route   PUT /api/posts/like/:id
// @desc    Like a post
// @access  Private
router.put('/like/:id', auth, postController.likePost);

// @route   POST /api/posts/comment/:id
// @desc    Comment on a post
// @access  Private
router.post('/comment/:id', auth, postController.commentOnPost);

module.exports = router;

