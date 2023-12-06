import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const BookingManager = () => {
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({
    customerName: '',
    destination: '',
    distance: 0,
    fare: 0,
    approved: false,
    driverId: null,
  });
  const [fuelPrice, setFuelPrice] = useState(0);
  const [drivers, setDrivers] = useState([
    { id: 'driver1', name: 'Driver 1' },
    { id: 'driver2', name: 'Driver 2' },
    // Add more drivers as needed
  ]);

  useEffect(() => {
    // Recalculate fare when distance or fuel price changes
    const updatedFare = calculateFare(newBooking.distance, fuelPrice);
    setNewBooking((prevBooking) => ({ ...prevBooking, fare: updatedFare }));
  }, [newBooking.distance, fuelPrice]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBooking((prevBooking) => ({ ...prevBooking, [name]: value }));
  };

  const handleAddBooking = () => {
    // Add the new booking to the list
    setBookings((prevBookings) => [...prevBookings, newBooking]);
    // Clear the form
    setNewBooking({
      customerName: '',
      destination: '',
      distance: 0,
      fare: 0,
      approved: false,
      driverId: null,
    });
  };

  const calculateFare = (distance, fuelPrice) => {
    // Simple fare calculation based on distance and fuel price
    return distance * fuelPrice;
  };

  const handleApproveBooking = (bookingId) => {
    // Toggle the approval status of the booking
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === bookingId ? { ...booking, approved: !booking.approved } : booking
      )
    );
  };

  return (
    <div className="container mt-4">
   <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
        <div className="container">
          <a className="navbar-brand" href="/">
            Booking App
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
              {/* Add more navigation items as needed */}
            </ul>
          </div>
        </div>
      </nav>
      <h2>Booking Manager</h2>
      <div className="mt-4">
        <h3>Add New Booking</h3>
        <form>
          <div className="mb-3">
            <label htmlFor="customerName" className="form-label">
              Customer Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="customerName"
              name="customerName"
              value={newBooking.customerName}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="destination" className="form-label">
              Destination:
            </label>
            <input
              type="text"
              className="form-control"
              id="destination"
              name="destination"
              value={newBooking.destination}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="distance" className="form-label">
              Distance (km):
            </label>
            <input
              type="number"
              className="form-control"
              id="distance"
              name="distance"
              value={newBooking.distance}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="fuelPrice" className="form-label">
              Fuel Price (per km):
            </label>
            <input
              type="number"
              className="form-control"
              id="fuelPrice"
              value={fuelPrice}
              onChange={(e) => setFuelPrice(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="driverId" className="form-label">
              Select Driver:
            </label>
            <select
              className="form-select"
              id="driverId"
              name="driverId"
              value={newBooking.driverId || ''}
              onChange={handleInputChange}
            >
              <option value="">Select a driver</option>
              {drivers.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddBooking}
          >
            Add Booking
          </button>
        </form>
      </div>
      <h3>Bookings</h3>
      <ul className="list-group">
        {bookings.map((booking, index) => (
          <li key={index} className="list-group-item">
            {booking.customerName} - {booking.destination} - Distance:{' '}
            {booking.distance} km - Fare: {booking.fare} - Approved:{' '}
            {booking.approved ? 'Yes' : 'No'} - Driver: {booking.driverId || 'Not Assigned'}
            <div className="mt-2">
              <button
                type="button"
                className="btn btn-success mx-1"
                onClick={() => handleApproveBooking(index)}
              >
                {booking.approved ? 'Disapprove' : 'Approve'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingManager;
