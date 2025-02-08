import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import StorageService from "./Storage.js";
import logo from "./assets/Charge-flex_logo.png";
import "./NavBar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // Track route changes
  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(StorageService.isCustomerLoggedIn());
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(StorageService.isAdminLoggedIn());
  const userName = StorageService.getUserName();

  useEffect(() => {
    // Update login status on route change
    setIsAdminLoggedIn(StorageService.isAdminLoggedIn());
    setIsCustomerLoggedIn(StorageService.isCustomerLoggedIn());
  }, [location.pathname]); // Runs when route changes

  const logout = () => {
    StorageService.logout();
    setIsAdminLoggedIn(false);
    setIsCustomerLoggedIn(false);
    navigate("/home"); // Redirect after logout
  };

  return (
    <header className="custom-navbar">
      {/* Show Public Navbar if No One is Logged In */}
      {!isAdminLoggedIn && !isCustomerLoggedIn ? (
        <>
          <div className="navbar-title">
            <img src={logo} className="logo" alt="Charge-flex Logo" />
            <Link to="/home" className="brand-text">Charge-flex</Link>
          </div>
          <div className="nav-links">
            <Link className="nav-button" to="/SignUp">Sign Up</Link>
            <Link className="nav-button" to="/login">Login</Link>
            <Link className="nav-button" to="/about">Contact</Link>
          </div>
        </>
      ) : (
        <div className="navbar-title">
          <span>Welcome, {userName || (isAdminLoggedIn ? "Admin" : "User")}</span>
        </div>
      )}

      {/* Show Admin Navbar */}
      {isAdminLoggedIn && (
        <div className="nav-links">
          <Link className="nav-button" to="/home">Home</Link>
          <button className="nav-button" onClick={logout}>Logout</button>
        </div>
      )}

      {/* Show Customer Navbar */}
      {isCustomerLoggedIn && (
        <div className="nav-links">
          <Link className="nav-button" to="/customer/dashboard">Dashboard</Link>
          <button className="nav-button" onClick={logout}>Logout</button>
        </div>
      )}
    </header>
  );
}

export default Navbar;
