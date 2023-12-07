import React, { useState } from 'react';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    pickupLocation: '',
    destination: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Backend
  };

  return (
    <div className="container mt-4">
      <h1>Booking Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Date:</label>
          <input type="date" className="form-control" name="date" value={formData.date} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Time:</label>
          <input type="time" className="form-control" name="time" value={formData.time} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Pickup Location:</label>
          <input type="text" className="form-control" name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Destination:</label>
          <input type="text" className="form-control" name="destination" value={formData.destination} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Book Now</button>
      </form>
    </div>
  );
};

export default BookingForm;
