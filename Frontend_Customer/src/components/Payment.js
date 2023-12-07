import React, { useState } from 'react';

const Payment = () => {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardHolder: '',
    expirationDate: '',
    cvv: '',
  });

  const handleChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Backend
  };

  return (
    <div className="container mt-4">
      <h1>Payment</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Card Number:</label>
          <input type="text" className="form-control" name="cardNumber" value={paymentData.cardNumber} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Card Holder:</label>
          <input type="text" className="form-control" name="cardHolder" value={paymentData.cardHolder} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Expiration Date:</label>
          <input type="text" className="form-control" name="expirationDate" value={paymentData.expirationDate} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>CVV:</label>
          <input type="text" className="form-control" name="cvv" value={paymentData.cvv} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Pay Now</button>
      </form>
    </div>
  );
};

export default Payment;
