// Correct way to define and export the router

const express = require('express');
const router = express.Router();

// Import your controllers
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const weatherController = require('../controllers/weatherController');

// Define your routes
router.post('/users', userController.createUser);
router.post('/posts', postController.createPost);
router.get('/posts', postController.getPosts);
router.post('/posts/:id/like', postController.likePost);
router.post('/posts/:id/comment', postController.commentOnPost);
router.get('/weather', weatherController.getWeatherByCity);

module.exports = router;

