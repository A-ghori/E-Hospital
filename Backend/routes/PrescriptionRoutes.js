const express = require('express')
const { createPrescription, getPrescriptionById, getALlPrescriptions} = require('../controllers/prescriptionController');
const { userAuth } = require('../middlewares/userAuth')

const router = express.Router();

// Creating Guest but No Auth
router.post('/create', createPrescription);

// It Only see Login User or Admin
router.get('/',userAuth, getALlPrescriptions);
router.get('/:id',userAuth, getPrescriptionById);

module.exports = router;