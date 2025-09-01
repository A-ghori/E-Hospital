import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Register () {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState('');
const [message, setMessage] = useState('');
const navigate = useNavigate();

const handleRegister = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post("http://localhost:5040/api/auth/register", {
            name,
            email,
            password,
        });
        setMessage(res.data.message || "Registration successful");
        if(res.data.message === "User registered successfully"){
          // 2 second baad home page pe redirect
          setTimeout(() => {
            navigate("/home");
          }, 2000);
        }

  } catch (err) {
    setMessage(err.response?.data?.message || "Error occurred");
  }
};
return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;

