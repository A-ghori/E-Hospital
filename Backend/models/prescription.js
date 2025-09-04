const mongoose = require('mongoose');

var prescriptionSchema = new mongoose.Schema({
      // CONNECTION WITH USER MODEL COLLECTION IN DB
       user: {
              type:mongoose.Schema.Types.ObjectId,
              ref:'User', // Link with User model
              required:false // for guest
       },
       name: {
        type: String,
        required: true,
        trim: true,
 
       },
       age: {
        type: String,
        required: true,
    
       },
       phone:{
        type: String,
        required: true,
       
       },
       hospitalName: {
        type: String,
        required: true,
      
       },
       doctorName:{
        type: String,
        required: false,
       },
       advice: {
        type: String,
        required: false,
       },
       description: {
              type:String,
              required: true,
       },
       
}, { timestamps: true});
// Compile model from schema
module.exports = mongoose.model('Prescription', prescriptionSchema );