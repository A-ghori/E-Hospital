const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/email');  // Email utility import
const sendOtpSms = require('../utils/sms');
const cloudinary = require('../utils/cloudinary');
const { isValidEmail, isValidPassword, isValidName, isPasswordPwned, isValidPhone } = require('../validators/userValidators');
const faculty = require('../models/faculty');

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, guest } = req.body;

    // Handle Guest user (skip validations, password/email optional)
    if (guest) {
      const guestUser = await User.create({
        name: name || "Guest",
        phone: phone || "N/A",
        guest: true
      });

      return res.status(201).json({
        message: "Guest user created",
        user: guestUser
      });
    }

    
// For normal registered users (email/password required)

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!isValidName(name)) {
      return res.status(400).json({ message: 'Invalid name. Use letters and spaces only.' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid or disposable email address.' });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({ message: 'Password must be minimum 8 characters, include uppercase, lowercase, number, and special character.' });
    }
    if( !isValidPhone(phone)){
      return res.status(400).json({
        message: "Invalid Phone Number"
      })
    }

    if (await isPasswordPwned(password)) {
      return res.status(400).json({ message: 'This password has appeared in a data breach. Please choose another.' });
    }
//Email check 
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
//Password Hashing 

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone
    });

    // Email sending code here
    try {
      const subject = 'Welcome to E-Hospital Service!';
      const htmlContent = `
        <div style="font-family: Arial, sans-serif; color: #4B0082; padding: 20px;">
          <h1 style="color: #FF6F61;">Hello ${newUser.name},</h1>
          <p style="font-size: 16px;">
            Thank you for registering at <strong>E-Hospital Service</strong>!
          </p>
          <hr style="border: none; height: 2px; background: linear-gradient(90deg, #4B0082, #FF6F61);" />
          <p style="font-size: 14px; color: #555;">
            We're excited to have you on board. If you have any questions, feel free to reply to this email.
          </p>
          <p style="font-size: 14px; color: #555;">Cheers,<br />The <strong>E-Hospital Service</strong> Team 🤍 Hopefully You and Your Family are Doing Well!</p>
        </div>
      `;
      await sendEmail(newUser.email, subject, htmlContent);
    } catch (error) {
      console.error('Email sending failed:', error);
    }

    res.status(201).json({
      message: 'User registered successfully',
      user: { 
        id: newUser._id, 
        name: newUser.name, 
        email: newUser.email,
        phone: newUser.phone,
      }
    });

  } catch (error) {
    console.error('Error in registerUser:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login User
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
//Generate Otp and send after successful login
const otp = Math.floor(100000 + Math.random() * 900000).toString();
user.otp = otp ;
user.otpExpiry = Date.now() + 5 * 60 * 1000; //OTP valid for 5 mins
await user.save();

// Send otp using utils 
const sent = await sendOtpSms (user.phone, otp);
if(!sent){
  return res.status(500).json({
    message: "Internal server error while sending OTP "
  });
}
return res.status(200).json({
  message: "Login successful, OTP sent successfully to your phone.",
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
  }
});
  } catch(err) {
    console.log("Error in LoginUser:", err);
      return res.status (500).json({
        message: "Internal Server Error"
      });
    }
  };

  exports.verifyUserOtp = async (req,res) => {
    try {
      const { email, otp} = req.body;

      if(!email || !otp) {
        return res.status(400).json({
          message: "Email and Otp are required"
        });
      }
      const user = await User.findOne({ email });
      if(!user){
        return res.status(400).json({
          message: "User not found "
        });
      }

      if(!user.otp || !user.otpExpiry){
        return res.status(400).json({
          message: "Otp not found, please login again"
        });
      }
      if(user.otp !== otp){
        return res.status(400).json({
          message: "Invalid OTP"
        });
      }
      if(user.otpExpiry < Date.now()){
        return res.status(400).json({
          message:"OTP has expired"
        })
      }
      // Clear OTP fields from DB
      user.otp = undefined;
      user.otpExpiry = undefined;
      await user.save();

      //Generate JWT toke
      const token = jwt.sign({
        id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone,
      },
    process.env.JWT_SECRET,
    { expiresIn: '1h'})
 return res.status(400).json({
  message: "OTP VERIFIED SUCCESSFULLY",
  token,
user: {
  id: user._id,
  name:user.name,
  email:user.email,
  phone: user.phone,
  
}
});
} catch(error){
  console.log("ERRO IN VERIFYUSEROTP",error)
  return res.status(500).json({
    message: "INTERNAL SERVER ISSUE"
  })
}
  }

exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, phone } = req.body;

    let avatarUrl;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      avatarUrl = result.secure_url;
    }

    const updateData = { name, phone };
    if (avatarUrl) updateData.avatar = avatarUrl;

    const updated = await User.findByIdAndUpdate(userId, updateData, { new: true });

    res.status(200).json({
      message: "Profile updated successfully",
      user: updated,
    });
  } catch (err) {
    console.error("Error updating user profile:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};