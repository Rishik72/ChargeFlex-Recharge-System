import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './RechargePlans.css';

const PlanCard = ({ amount, data, validity, calls, talktime, onRecharge }) => (
  <motion.div 
    className="plan-card"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <h5 className="plan-amount">₹ {amount}</h5>
    <div className="plan-details">
      {data && <p><span className="detail-label">Data:</span> {data}</p>}
      <p><span className="detail-label">Validity:</span> {validity === 'NA' ? 'NA' : `${validity} days`}</p>
      {calls && <p><span className="detail-label">Calls:</span> {calls}</p>}
      {talktime && <p><span className="detail-label">Talktime:</span> ₹ {talktime}</p>}
    </div>
    <button 
      onClick={() => onRecharge(amount, validity)}
      className="recharge-button"
    >
      Recharge Now
    </button>
  </motion.div>
);

const RechargePlans = () => {
  const navigate = useNavigate();

  const handleRecharge = (amount, validity) => {
    if (window.confirm(`Proceed to payment?\n\nPlan Amount: ₹ ${amount}\nValidity: ${validity} days`)) {
      navigate('/payment-gateway', { state: { amount, validity } });
    }
  };

  return (
    <div className="recharge-container">
      <div className="gradient-overlay" />
      
      <div className="content-container">
        {/* Popular Plans */}
        <section className="plan-section">
          <h2 className="section-title">Popular Plans</h2>
          <div className="plans-grid">
            <PlanCard amount={259} data="1.5GB / day" validity="30" calls="Unlimited" onRecharge={handleRecharge} />
            <PlanCard amount={399} data="3GB / day + 6GB" validity="28" calls="Unlimited" onRecharge={handleRecharge} />
            <PlanCard amount={666} data="1.5GB / day" validity="84" calls="Unlimited" onRecharge={handleRecharge} />
            <PlanCard amount={1198} data="2GB / day + 18GB" validity="84" calls="Unlimited" onRecharge={handleRecharge} />
          </div>
        </section>

        {/* Data Add On */}
        <section className="plan-section">
          <h2 className="section-title">Data Add On</h2>
          <div className="plans-grid">
            <PlanCard amount={49} data="Unlimited" validity="1" calls="NA" onRecharge={handleRecharge} />
            <PlanCard amount={148} data="10GB" validity="28" calls="NA" onRecharge={handleRecharge} />
            <PlanCard amount={331} data="40GB" validity="30" calls="NA" onRecharge={handleRecharge} />
            <PlanCard amount={667} data="150GB" validity="90" calls="NA" onRecharge={handleRecharge} />
          </div>
        </section>

        {/* Smart Phone */}
        <section className="plan-section">
          <h2 className="section-title">Smart Phone</h2>
          <div className="plans-grid">
            <PlanCard amount={299} data="2GB / day" validity="28" calls="Unlimited" onRecharge={handleRecharge} />
            <PlanCard amount={749} data="2GB / day" validity="90" calls="Unlimited" onRecharge={handleRecharge} />
            <PlanCard amount={1099} data="2GB / day + 18GB" validity="84" calls="Unlimited" onRecharge={handleRecharge} />
            <PlanCard amount={2999} data="2.5GB / day" validity="365" calls="Unlimited" onRecharge={handleRecharge} />
          </div>
        </section>

        {/* Top Up */}
        <section className="plan-section">
          <h2 className="section-title">Top Up</h2>
          <div className="plans-grid">
            <PlanCard amount={20} talktime="14.95" validity="NA" onRecharge={handleRecharge} />
            <PlanCard amount={50} talktime="39.37" validity="NA" onRecharge={handleRecharge} />
            <PlanCard amount={100} talktime="81.75" validity="NA" onRecharge={handleRecharge} />
            <PlanCard amount={1000} talktime="844.46" validity="NA" onRecharge={handleRecharge} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default RechargePlans;
