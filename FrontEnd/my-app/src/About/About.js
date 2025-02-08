import React from "react";
import { Link } from "react-router-dom";
import "./About.css"; 


const About = () => {
  return (
    <main className="about-main">
      
      <div className="about-container">
        <h1 className="about-title">About Us</h1>
        <p className="about-description">
          At <span className="highlight">Charge-Flex</span>, we believe in making mobile recharges fast, easy, and secure. Our platform provides users with a seamless experience to recharge on the go. We are committed to delivering a reliable and user-friendly service that keeps you connected at all times.
        </p>

        <div className="about-section">
          <h2 className="section-title">Our Mission</h2>
          <p className="section-content">
            To simplify mobile recharges and provide a fast, reliable, and secure platform for our users.
          </p>
        </div>

        <div className="about-section">
          <h2 className="section-title">Our Vision</h2>
          <p className="section-content">
            To be the most trusted platform for mobile recharges, known for our innovation and customer-centric approach.
          </p>
        </div>

        <div className="about-section">
          <h2 className="section-title">Meet the Team</h2>
          <p className="section-content">
            Our team is made up of passionate individuals dedicated to creating the best recharge experience. We constantly innovate and improve our services to meet your needs.
          </p>
        </div>

        <Link to="/" className="back-home-link">← Back to Home</Link>
      </div>
    </main>
  );
};

export default About;
