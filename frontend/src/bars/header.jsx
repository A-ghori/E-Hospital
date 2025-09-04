// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header style={styles.header}>
      <h1>Welcome to E-Hospital</h1>
      <p>Your one-stop solution for hospital services, tickets, and ambulance booking.</p>
      <div style={styles.buttons}>
        <Link to="/dashboard/ambulance" style={styles.button}>Book Ambulance</Link>
        <Link to="/prescription" style={styles.button}>Book Ticket</Link>
      </div>
    </header>
  );
}

const styles = {
  header: { textAlign: "center", padding: "4rem 2rem", backgroundColor: "#f3f3f3" },
  buttons: { marginTop: "2rem", display: "flex", justifyContent: "center", gap: "1rem" },
  button: { padding: "0.8rem 1.5rem", backgroundColor: "#4B0082", color: "#fff", textDecoration: "none", borderRadius: "5px" }
};

export default Header;