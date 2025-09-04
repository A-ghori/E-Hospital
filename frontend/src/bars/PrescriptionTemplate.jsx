import React from 'react';
import '../styles/prescription.css'; 

function PrescriptionTemplate({ 
  hospitalName, 
  patientName, 
  age, 
  gender, 
  symptoms,     // ✅ fixed typo (was symtoms)
  prescriptionList, 
  doctorName, 
  date 
}) {
  return (
    <div className='prescription-container'>
      
      {/* Header with Hospital Name */}
      <header className='prescription-header'>
        <h2>{hospitalName}</h2>
        <hr />
      </header>

      {/* Patient Info */}
      <section className='patient-info'>
        <p><strong>Patient Name:</strong> {patientName || "....................."}</p>
        <p><strong>Age:</strong> {age || "...."} | <strong>Gender:</strong> {gender || "...."}</p>
        <p><strong>Date:</strong> {date || "...."}</p>
      </section>

      {/* Symptoms */}
      <section className='symptoms'>
        <h3>Symptoms</h3>
        <p>{symptoms || "....................."}</p>
      </section>

      {/* Prescription List */}
      <section className='prescription'>
        <h3>Prescription</h3>
        <ol>
          {prescriptionList && prescriptionList.length > 0 ? (
            prescriptionList.map((item, index) => (
              <li key={index}>
                {item.medicine} - {item.dosage}
              </li>
            ))
          ) : (
            <p>........................................</p>
          )}
        </ol>
      </section>

      {/* Doctor Signature */}
      <footer className="doctor-sign">
        <p><strong>Doctor:</strong> {doctorName}</p>
        <div className="signature-line">Signature: ___________________</div>
      </footer>

    </div>
  );
}

export default PrescriptionTemplate;