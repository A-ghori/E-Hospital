import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./bars/navbar";
import Header from './bars/header';
import Footer from './bars/footer';

import Register from './pages/registration';
import Login  from './pages/login';
import Home from './pages/home';
import About from "./pages/about";
import PrescriptionForm from "./pages/PrescriptionForm";
import PrescriptionList from "./pages/PrescriptionList";
import PrescriptionView from "./pages/PrescriptionView";
function App() {
  
  const [user, setUser] = useState(null);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };
  return (
   <Router>
    <Navbar user={user} logout={logout} />
    <Header/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/prescription/create" element={<PrescriptionForm />} />
<Route path="/prescriptions" element={<PrescriptionList />} />
<Route path="/prescription" element={<PrescriptionView />} />
    </Routes>
    <Footer/>
   </Router>
  )
}

export default App
