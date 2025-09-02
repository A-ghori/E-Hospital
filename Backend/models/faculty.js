const mongoose = require ('mongoose');

const facultySchema = new mongoose.Schema({
    username: {
        type:String,
        required: true,
        unique: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
    type: String,
    required: true,
    },
    phone:{
    type: String,
    required: true,
    unique: true
    },
    otp:{
    type: String,
    },
    otpExpiry:{
    type: Date,
    default:Date.now,
    expires: "5m"
    },
    designation: {
        type:String,
        required: true
    },
    department: {
        type:String,
        required: true
    },
college: {
    type: String,
    required: true
},
avtar: {
    type: String,
    required: true,
    default: "https://via.placeholder.com/150"
},
description: {
    type:String,
    required: true

},

}, {timestamps: true});

module.exports = mongoose.model('Faculty',facultySchema);