// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

function Navbar({ user, logout }) {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <Link to="/" style={styles.link}>E-Hospital</Link>
      </div>
      <ul style={styles.navLinks}>
        <li><Link to="/" style={styles.link}>Home</Link></li>
        <li><Link to="/about" style={styles.link}>About</Link></li>
        {!user && (
          <>
            <li><Link to="/login" style={styles.link}>Login</Link></li>
            <li><Link to="/register" style={styles.link}>Register</Link></li>
          </>
        )}
        {user && (
          <>
            <li><Link to="/dashboard" style={styles.link}>Dashboard</Link></li>
            <li><button onClick={logout} style={styles.logoutBtn}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}

const styles = {
  nav: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2rem", backgroundColor: "#4B0082", color: "#fff" },
  logo: { fontWeight: "bold", fontSize: "1.5rem" },
  navLinks: { listStyle: "none", display: "flex", gap: "1rem", alignItems: "center" },
  link: { textDecoration: "none", color: "#fff" },
  logoutBtn: { backgroundColor: "transparent", border: "1px solid #fff", color: "#fff", padding: "0.3rem 0.7rem", cursor: "pointer" }
};

export default Navbar;