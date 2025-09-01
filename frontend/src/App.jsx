import React from 'react'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Register from './pages/registration';
import Login  from './pages/login';
import Home from './pages/home'
function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
   </Router>
  )
}

export default App
