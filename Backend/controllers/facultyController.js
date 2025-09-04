const Faculty = require ('../models/faculty');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendOtpSms} = require ('../utils/sms');
const cloudinary = require('../utils/cloudinary');



//Register Faculty
exports.registerFaculty = async (req,res) => {
            try {
    const { username, email, password, phone, designation, department, college, description } = req.body;

        if(!username || !email || !password || !designation || !department || !phone || !college || !description){
            return res.status(400).json({
            message: "All fields are required for GO further"
            });
}

        // Email check 
    const existingFaculty = await Faculty.findOne({ email });
        if(existingFaculty){
            return res.status(400).json({
            message: "Faculty member is already exist"
            });
}

        // Password Hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newFaculty = await Faculty.create ({
            username,
            email,
            password: hashedPassword,
            designation: designation || 'faculty-member',
            department,
            phone,
            college,
            description,
        });
        return res.status(201).json({
            message: 'Faculty Member is registered Successfully',
            faculty: {
                id: newFaculty._id,
                username: newFaculty.username,
                department: newFaculty.department,
                email: newFaculty.email,
                phone: newFaculty.phone,
                designation: newFaculty.designation,
                college: newFaculty.college,
                description: newFaculty.description,
}
        });
} 
    catch (error) {
        console.error ("Error Registration",error.message);
            return res.status(500).json({
            message: "Internal Server Issue"
        });
}
}

// Login Faculty

exports.loginFaculty = async(req, res) => {
        try {
    const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                message: "All fields are required for login"
            });
}
    const faculty = await Faculty.findOne({email});
        if(!faculty){
            return res.status(400).json({
            message: "faculty Member Not Found"
        });
}
    const isMatch = await bcrypt.compare(password, faculty.password);
        if(!isMatch){
            return res.status(400).json ({
            message: "Invalid Cradentials"
            });
}

        // Generate OTP and send after successful login
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
        faculty.otp = otp;
        faculty.otpExpiry = Date.now() + 5 * 60 * 1000; // OTP valid for 5 mins
        await faculty.save();

        // Send OTP using UTiLS
    const sent = await sendOtpSms(faculty.phone, otp);
        if (!sent) {
            return res.status(500).json({
            message: "Internal server error while sending OTP"
            });
}

        return res.status(200).json({
            message: "Login successful. OTP sent successfully to your phone.",
            faculty: {
                id: faculty._id,
                username: faculty.username,
                department: faculty.department,
                email: faculty.email,
                phone: faculty.phone,
                designation: faculty.designation,
                college: faculty.college,
                description: faculty.description
}
        });
}       
        catch (err) {
        console.log("Error in loginFaculty:", err);
        return res.status(500).json({
            message: "Internal server error"
        });
}
}

exports.verifyFacultyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                message: "Email and OTP are required"
            });
        }

        const faculty = await Faculty.findOne({ email });
        if (!faculty) {
            return res.status(400).json({
                message: "Faculty member not found"
            });
        }

        if (!faculty.otp || !faculty.otpExpiry) {
            return res.status(400).json({
                message: "OTP not found, please login again"
            });
        }

        if (faculty.otp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        if (faculty.otpExpiry < Date.now()) {
            return res.status(400).json({
                message: "OTP has expired"
            });
        }

        // Clear OTP fields
        faculty.otp = undefined;
        faculty.otpExpiry = undefined;
        await faculty.save();

        // Generate JWT token
        const token = jwt.sign({
            id: faculty._id,
            email: faculty.email,
            designation: faculty.designation,
            department: faculty.department,
            college: faculty.college,
            description: faculty.description
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' });

        return res.status(200).json({
            message: "OTP verified successfully",
            token,
            faculty: {
                id: faculty._id,
                username: faculty.username,
                department: faculty.department,
                email: faculty.email,
                phone: faculty.phone,
                designation: faculty.designation,
                college: faculty.college,
                description: faculty.description
            }
        });
    } catch (error) {
        console.error("Error in verifyFacultyOtp:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

exports.updateFacultyProfile = async (req,res) => {
    try{
        const facultyId = req.faculty.id //From Jwt middleware
        const { username, phone } = req.body;

        // If file upload sent to cloudinary
        let avatarUrl;
        if(req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            avatarUrl = result.secure_url;
        }
        const updated = await Faculty.findByIdAndUpdate(
            facultyId,
            {username, phone, ...(avatarUrl && { avatar:avatarUrl })},
            { new: true }
        );
        res.status(200).json({
            message: "Profile uodated successfully",
            faculty: updated,
        });
    } catch (err) {
        console.error("Error updating faculty profile:", err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}
