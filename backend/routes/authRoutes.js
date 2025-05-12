const express = require('express');
const router = express.Router();
const { sendOTP, verifyOTP, getCurrentUser, logout } = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);
router.get('/me', verifyToken, getCurrentUser);
router.post('/logout', logout);

module.exports = router;
