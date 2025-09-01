const express = require('express');
const { registerAdmin,loginAdmin, verifyOtp } = require('../controllers/adminController');
const router = express.Router();

//Register Route
router.post('/register', registerAdmin)

//Login route
router.post('/login',loginAdmin);

//Verify OTP route
router.post('/verify-otp', verifyOtp);

module.exports = router;