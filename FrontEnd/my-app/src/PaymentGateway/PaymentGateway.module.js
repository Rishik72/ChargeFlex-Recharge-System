import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, CheckCircle, ArrowLeft } from 'lucide-react';
import styles from './PaymentGateway.module.css'; // Ensure your file is named PaymentGateway.module.css

const PaymentGateway = () => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  // Formats card number into groups of 4 digits separated by a space
  const formatCardNumber = (value) =>
    value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim();

  // Formats expiry date to MM/YY (basic formatting)
  const formatExpiryDate = (value) =>
    value.replace(/[^0-9]/g, '').replace(/^(\d{2})/, '$1/');

  // Validate all fields
  const validateForm = () => {
    let errors = {};

    // Check for a non-empty name
    if (!name.trim()) {
      errors.name = "Card holder name is required.";
    }
    // Validate card number: ensure 16 digits after removing spaces
    const digits = cardNumber.replace(/\s+/g, '');
    if (digits.length !== 16) {
      errors.cardNumber = "Card number must be 16 digits.";
    }
    // Validate expiry date: Must be in MM/YY format
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
      errors.expiryDate = "Expiry date must be in MM/YY format.";
    }
    // Validate CVV: Must be exactly 3 digits
    if (!/^\d{3}$/.test(cvv)) {
      errors.cvv = "CVV must be 3 digits.";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorsFound = validateForm();
    if (Object.keys(errorsFound).length > 0) {
      setErrors(errorsFound);
      return;
    }
    setErrors({});
    setIsProcessing(true);

    // Simulate a payment process delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      // Removed navigation: the page will now remain on the success message.
    }, 2000);
  };

  return (
    <div className={styles.paymentGateway}>
      <div className={styles.container}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          <ArrowLeft className={styles.icon} />
          Back
        </button>

        <motion.div
          className={styles.paymentForm}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.titleContainer}>
            <CreditCard className={styles.icon} />
            <h1 className={styles.title}>Secure Payment</h1>
          </div>

          {isSuccess ? (
            <div className={styles.successMessage}>
              <CheckCircle className={styles.successIcon} />
              <h2>Payment Successful!</h2>
              <p>Your payment has been processed successfully.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label>Card Holder Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                />
                {errors.name && <p className={styles.error}>{errors.name}</p>}
              </div>

              <div className={styles.inputGroup}>
                <label>Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  maxLength={19}
                  placeholder="1234 5678 9012 3456"
                  required
                />
                {errors.cardNumber && <p className={styles.error}>{errors.cardNumber}</p>}
              </div>

              <div className={styles.inputGroupGrid}>
                <div>
                  <label>Expiry Date</label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                    maxLength={5}
                    placeholder="MM/YY"
                    required
                  />
                  {errors.expiryDate && <p className={styles.error}>{errors.expiryDate}</p>}
                </div>

                <div>
                  <label>CVV</label>
                  <input
                    type="password"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                    maxLength={3}
                    placeholder="123"
                    required
                  />
                  {errors.cvv && <p className={styles.error}>{errors.cvv}</p>}
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isProcessing}
                className={styles.submitButton}
                whileTap={{ scale: 0.98 }}
              >
                {isProcessing ? 'Processing...' : 'Pay Now'}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentGateway;
