const mongoose = require ('mongoose');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // New field for 2fa
    phone: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['admin', 'superadmin'],
        default: 'admin'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    otp: {
        type: String,

    },
    otpExpiry: {
        type: Date,
        default: Date.now,
        expires: '5m'
    },
    avtar: {
        type: String,
        required: true,
        default:"https://via.placeholder.com/150"
    }
}, {timestamps: true} );

module.exports = mongoose.model('Admin', adminSchema);
