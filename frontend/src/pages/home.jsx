import React from 'react';
import { useNavigate }  from 'react-router-dom';


function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px"}} >
<h1> Welcome to E-Hospital</h1>
<p>
  You can continue as a guest or <strong onClick={() => navigate("/login")}>login/register</strong>
</p>

<button onClick = {() => navigate("/about")}>
  Go to About Page
  </button>  
<button onClick={() => navigate("/login")} style={{margin: "10px"}}>
  Login
</button>
<button onClick={() => navigate("/register")} style={{margin: "10px"}}>
  Register
</button>
    </div>
  )
}

export default Home; 