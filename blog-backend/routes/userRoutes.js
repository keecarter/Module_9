const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

// Register User
router.post('/register', userController.registerUser);

// Login User
router.post('/login', userController.loginUser);

// Get User
router.get('/me', auth, userController.getUser);

module.exports = router;
