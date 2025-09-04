import React from 'react';

function Footer() {
    return (
        <footer style= {styles.footer}>
            <div>
                <h3> E-Hospital Service </h3>
                <p>&copy; 2025 E-Hospital Service. All rights reserved.</p>
                </div>
                <div>
                    <h4> Contact </h4>
                    <p> Email: support@hospital.com</p>
                    <p> Phone: +91 8697946016 </p>
                </div>
                <div>
                    <h4> Follow Us</h4>
                    <p>Facebook | Twitter | Instagram </p>
                </div>
        </footer>
    )
}



const styles = {
  footer: { display: "flex", justifyContent: "space-around", padding: "2rem", backgroundColor: "#4B0082", color: "#fff", flexWrap: "wrap", gap: "1rem" }
};

export default Footer;