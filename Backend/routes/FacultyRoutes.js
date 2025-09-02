const express = require('express');
const { registerFaculty,loginFaculty, verifyFacultyOtp } = require('../controllers/facultyController');
const router = express.Router();

//Register Route
router.post('/register', registerFaculty)

//Login route
router.post('/login',loginFaculty);

//Verify OTP route
router.post('/verify-otp', verifyFacultyOtp);

module.exports = router;