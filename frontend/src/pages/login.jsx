import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login(){
const [email, setEmail] = useState('');
const[password, setPassword] = useState('');
const[message, setMessage] = useState("");
const navigate = useNavigate();

const handleLogin = async (e) => {
    e.preventDefault ();
    try {
        const res = await axios.post('http://localhost:5040/api/auth/login', {
            email,
            password,
        });
setMessage(res.data.message);
if(res.data.success){
    navigate('/dashboard');
}
localStorage.setItem("token", res.data.token); //save JWT
navigate('/'); //Redirect to home

    } catch(err){
        setMessage(err.response.data.message);
    }
};
return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;