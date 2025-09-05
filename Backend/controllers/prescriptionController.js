const Prescription = require('../models/prescription');
const User = require('../models/user');

//Create Prescription

exports.createPrescription = async (req,res) => {
try{
    const {patientName, age, gender, symptoms, medicines, doctorName, hospitalName} = req.body;

    //If logged In in user (from middleware)
    const userId = req.user? req.user.id : null;


// Prescription Creation
    const prescription = await Prescription.create({
        user: userId,
        patientName,
        age,
        gender,
        symptoms,
        medicines,
        doctorName,
        hospitalName,
    });
    await prescription.save();

    return res.status(201).json({
        message: "Prescription created successfully",
        prescription,
    });
} catch(err){
    console.log("Error Creating Prescription", err);
    return res.status(500).json({
        message: "Internal Server Error"
    });
}
};

//Get All Prescriptons
exports.getALlPrescriptions = async(req,res) =>{
    try{
        const prescriptions = await prescriptions.find().populate('user','name email phone avatar'); //Fetch the total user data from the db;

        res.status(200).json({
            message: "All Prescriptions Fetched Successfully",
            prescriptions
        });
    } catch(error){
        console.error("Error fetching prescriptions", error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

// Get single prescription By ID
exports.getPrescriptionById = async (req,res) => {
    try{
        const { id } = req.params;
        const prescription = await Prescription.findById(req.params.id).populate('user','name, email, phone, avatar');
        if(!prescription){
            return res.status(404).json({
                message: "Prescription Not Found"
            });

        }
        return res.status(200).json({
            message: "Prescription Fetched Successfully",
            prescription
        });
    }catch (err){
        console.error("Error Fetching Prescription", err);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    };
}