import React from "react";
function About() {
    return (
        <div style = {{ maxWidth: "800px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#f9f9f9" }} >
            <header style={{ textAlign: "center", marginBottom: "30px"}}>

            </header>
            <section>
                <h2>About Us</h2>
                <p>
                              E-Hospital is a digital healthcare platform designed to make medical
          services accessible and efficient. From booking ambulances and hospital
          tickets to finding the nearest healthcare centers, everything is available in one place.
                </p>
            </section>

            <section>
                <h2>
                    Features
                </h2>
                <ul>
                    <li> Ambulance Booking</li>
                    <li> Doctor Appointment </li>
                    <li> Ticket Booking</li>
                    <li> Nearest hospital Map</li>
                    <li> Online Medical Records</li>
                </ul>
            </section>
 <section>
        <h2>Our Mission</h2>
        <p>To simplify healthcare access for everyone.</p>
        <h2>Our Vision</h2>
        <p>A world where medical help is just one click away.</p>
      </section>

      <footer style={{ textAlign: "center", marginTop: "50px" }}>
        <p>Developed by Shubhayu Barua</p>
        <p>© 2025 E-Hospital. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default About;