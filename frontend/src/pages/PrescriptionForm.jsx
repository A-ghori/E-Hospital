import React, { useState } from "react";
import PrescriptionTemplate from "../bars/PrescriptionTemplate";
import axios from "axios";

function PrescriptionForm() {
  const [formData, setFormData] = useState({
    hospitalName: "",
    patientName: "",
    age: "",
    gender: "Male",
    symptoms: "",
    doctorName: "",
    prescriptionList: [{ medicine: "", dosage: "" }],
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePrescriptionChange = (index, field, value) => {
    const updatedList = [...formData.prescriptionList];
    updatedList[index][field] = value;
    setFormData({ ...formData, prescriptionList: updatedList });
  };

  const addMedicine = () => {
    setFormData({
      ...formData,
      prescriptionList: [...formData.prescriptionList, { medicine: "", dosage: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5040/api/prescriptions/create", formData);
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Error creating prescription",err);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Create Prescription</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="hospitalName" placeholder="Hospital Name" onChange={handleChange} required />
        <input type="text" name="patientName" placeholder="Patient Name" onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
        <select name="gender" onChange={handleChange}>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <textarea name="symptoms" placeholder="Symptoms" onChange={handleChange}></textarea>
        <input type="text" name="doctorName" placeholder="Doctor Name" onChange={handleChange} required />

        <h4>Prescription List</h4>
        {formData.prescriptionList.map((item, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Medicine"
              value={item.medicine}
              onChange={(e) => handlePrescriptionChange(index, "medicine", e.target.value)}
            />
            <input
              type="text"
              placeholder="Dosage"
              value={item.dosage}
              onChange={(e) => handlePrescriptionChange(index, "dosage", e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={addMedicine}>+ Add Medicine</button>

        <br />
        <button type="submit">Save Prescription</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default PrescriptionForm;