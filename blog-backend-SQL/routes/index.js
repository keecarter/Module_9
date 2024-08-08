const express = require('express');
const router = express.Router();
const routes = require('./routes/index');

// Import your controllers here
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');

// User routes
router.post('/users', userController.createUser);

// Post routes
router.post('/posts', postController.createPost);
router.get('/posts', postController.getPosts);
router.post('/posts/:id/like', postController.likePost);
router.post('/posts/:id/comment', postController.commentOnPost);

module.exports = router;
app.use('/api', routes);
