import React, { useEffect, useState } from "react";
import axios from "axios";

function PrescriptionList() {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    const res = await axios.get("http://localhost:5040/api/prescriptions");
    setPrescriptions(res.data);
  };

  const downloadPDF = (id) => {
    window.open(`http://localhost:5040/api/prescriptions/download/${id}`, "_blank");
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <h2>Prescriptions</h2>
      <ul>
        {prescriptions.map((p) => (
          <li key={p._id} style={{ marginBottom: "1rem", padding: "1rem", border: "1px solid #ccc" }}>
            <strong>{p.patientName}</strong> ({p.age}, {p.gender})  
            <br /> Doctor: {p.doctorName}  
            <br /> Hospital: {p.hospitalName}  
            <br />
            <button onClick={() => downloadPDF(p._id)}>Download PDF</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PrescriptionList;