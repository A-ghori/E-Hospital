const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendOtpSms } = require ('../utils/sms');
const { cloudinary_js_config } = require('../utils/cloudinary');


//Register Admin
exports.registerAdmin = async (req,res) => {
    try {
        const { username, email, password, role, phone } = req.body;

        if(!username || !email || !password || !role || !phone){
            return res.status(400).json({ message: 'All Fields are required for Go Further'});
            
        };
        const existingAdmin = await Admin.findOne({ email });
        if(existingAdmin){
            return res.status(400).json({ message: 'Admin already exists'});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = await Admin.create ({
            username,
            email,
            password: hashedPassword,
            role: role || 'admin',
            phone,
        });
        return res.status(201).json({
            message: 'Admin registered successfully',
            admin: {
                id: newAdmin._id,
                username: newAdmin.username,
                email: newAdmin.email,
                role: newAdmin.role
            },  
        });
    } catch (error) {
        console.error('Error registering admin:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


// Login Admin 
// If already register then enter the password and username for login successfully

exports.loginAdmin = async (req,res) => {
    try {
        const { email , password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                message: 'All Fields are required for Go Further'
            });
        }
        const admin = await Admin.findOne({ email});
        if(!admin){
            return res.status(400).json({
                message: "Admin not found"
            });
        }
const isMatch  = await bcrypt.compare(password, admin.password);
if(!isMatch){
    return res.status(400).json({
        message: "Invalid credentials"
    });
}


// Generate OTP 
try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    admin.otp = otp;
    admin.otpExpiry = Date.now() + 5 * 60 * 1000; // OTP valid for 5 mins
    await admin.save();

    // Send OTP USING UTILS 
    const sent = await sendOtpSms(admin.phone, otp);
    if(!sent){
        return res.status(500).json({
            message: "Failed to send OTP"
        });
    }
    return res.status(200).json({
        message: "OTP sent successfully to your phone"
    });
} catch (err){
    console.log("Error sending OTP:", err);
    return res.status(500).json({
        message: "Internal server error"
    });
}

    } catch (error){
        console.log("Error logging in admin:", error);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}


// Verify OTP 
exports.verifyOtp = async (req,res) => {
    try {
        const { email , otp } = req.body;
        if(!email || !otp){
            return res.status(400).json({
                message: "Email and OTP are required for login"
            });
        }
        
        //Email Check 
        const admin = await Admin.findOne({ email });
        if(!admin){
            return res.status(400).json({
                message: "Admin not found"
            });
        }
        
        // Check OTP 
        if(admin.otp !== otp || admin.otpExpiry < Date.now()){
            return res.status(400).json({
                message: "Invalid or Expired OTP"
            });
        }
        
        // Clear OTP after successful verification 
        admin.otp = undefined;
        admin.otpExpiry = undefined;
        await admin.save();
        
        //Generate JWT Token ;
        const token = jwt.sign(
            {
                id: admin._id,
                email: admin.email,
                role: admin.role,
            },
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );
        return res.status(200).json({
            message: "OTP verified successfully Verification complete",
            token,
            admin: {
                admin: admin._id,
                email:admin.email,
                role:admin.role,
            },
        });
    } catch(err){
        console.log("Error verifying OTP:", err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}


exports.updateAdminProfile = async (req, res) => {
    try{
        const adminId = req.admin.id //From JWT middleware
        const { username, photo } = req.body;

        //If the file sent to cloudinary 
        let avatarUrl;
        if(req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            avatarUrl = result.secure_url;
        }
        const updated = await Admin.findByIdAndUpdate(
            adminId,
            {username, phone, ...Admin(avatarUrl && { avatar: avatarUrl })},
            {new: true }
        );
        res.status(200).json({
            message: 'Profile upload Successfully',
            admin: updated,
        });

    }catch(err){
        console.log("Error updating Admin profile", err);
        res.status(500).json({
            message: "Internal Server error"
        })
    }
}