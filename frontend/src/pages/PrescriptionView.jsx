import PrescriptionTemplate  from "../bars/PrescriptionTemplate";

function PrescriptionView() {
    const samplePrescription = {
        hsopitalName : "XYZ Medical College",
        patientName: 'Shubhayu Barua',
        age: 32,
        gender: 'Male',
        symptons: "Fever, cold, Cough",
        prescriptionList: [
            { medcine:"paracetamol 500 mg", dosage: '1 tablet twice daily'},
            {medicine: "amozocylin 200 mg", dosage: "1/2 table spoon a day"},
            { medicine: "Vitamin C", dosage: "1 tablet daily" },
        ],
        doctorName: 'Dr S.Mukherjee',
        date: new Date().toLocaleDateString(),

    };

    return <PrescriptionTemplate {...samplePrescription} />
}
export default PrescriptionView;


