
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './NavBar';
import Home from './Home/Home.js';
import Signup from './SignUp/SignUp.js';
import Login from './Login/Login.js';
import CustomerDashboard from './CustomerDashboard/CustomerDashboard.js';
import RechargePlans from './RechargePlans/RechargePlans.js';
import AdminDashboard from './AdminDashboard/AdminDashboard.js';
import PaymentGateway from './PaymentGateway/PaymentGateway.module.js';
import About from './About/About.js';
import './App.css';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/about" element={<About/>}/>
          <Route path="/recharge-plans" element={<RechargePlans />} />
          <Route path="/payment-gateway" element={<PaymentGateway />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
/**/
