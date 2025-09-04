const express = require('express');
const { registerFaculty, loginFaculty, verifyFacultyOtp, updateFacultyProfile } = require('../controllers/facultyController');
const { facultyAuth } = require('../middlewares/facultyAuth');

const router = express.Router();

// Register Route
router.post('/register', registerFaculty);

// Login route
router.post('/login', loginFaculty);

// Verify OTP route
router.post('/verify-otp', verifyFacultyOtp);

// Profile route (protected)
router.get('/profile', facultyAuth, updateFacultyProfile);

module.exports = router;