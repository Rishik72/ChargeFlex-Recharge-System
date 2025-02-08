import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import AuthService from "../AuthService.js";
import StorageService from "../Storage.js";
import AuthBackgroundImage from '../assets/auth-bckground-img.png';
import './Login.css'



const Login = () => {
      const [formData, setFormData] = useState({ email: "", password: "" });
      const [isFormValid, setIsFormValid] = useState(false);
      const [isLoading, setIsLoading] = useState(false);
      const navigate = useNavigate();
    
      useEffect(() => {
        setIsFormValid(formData.email !== "" && formData.password !== "");
      }, [formData]);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid) return;
        setIsLoading(true);
        try {
          const res = await AuthService.login(formData);
          console.log(res.data.jwt)
          if (res.data) {
            const user = {
              id: res.data.userId,
              role: res.data.userRole,
              name: res.data.name,
              phone: res.data.phone,
              email: formData.email,
            };
            StorageService.saveUser(user);
            StorageService.saveToken(res.data.jwt);
            // console.log(StorageService.isCustomerLoggedIn())
            
            if (StorageService.isAdminLoggedIn()) {

              navigate("/admin");
            } else if (StorageService.isCustomerLoggedIn()) {
              navigate("/customer-dashboard");
            } else {
              message.error("Bad Credentials", 5);
            }
          }
        } catch (error) {
          message.error("Login failed. Please try again.", 5);
        }
        setIsLoading(false);
      };





  

  return (
    <>
      
      <div className="main">
   
        <div className="container">
          <div className="left-div">
            <img src={AuthBackgroundImage} className="background-img" alt="Background" />
          </div>
          <div className="right-div">
            <div className="imgDiv">
              <div>
                <div className="signup-heading">Login</div>
              </div>
            </div>
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-item">
                <label className="label">Email</label>
                <div className="input-group">
                  <span className="icon">📧</span>
                  <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-item">
                <label className="label">Password</label>
                <div className="input-group">
                  <span className="icon">🔒</span>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-item"style={{ paddingTop: "15px", alignItems: "center" }} >
                <button className="login-form-button" type="submit" disabled={!isFormValid}>Log in</button>
                Or  <Link to="/SignUp">Register now!</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};


export default Login;
