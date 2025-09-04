const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    phone: {
type: String,
required: true,
unique: true,
    },
    otp:{
        type:String,
    },
    otpExpiry:{
        type: Date,
        default: Date.now,
        expires:300
    },
    avatar: {
        type: String,
        required: true,
        default: "https://via.placeholder.com/150"
    },
    guest: {
  type: Boolean,
  default: false
},
    //CONNECTION WITH PRESCRIPTION MODEL COLLECTION IN DB
prescriptions: [
    {
        type:mongoose.Schema.Types.ObjectId,
    ref:'Prescription'
}
]



}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);