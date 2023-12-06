import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const DriverManager = () => {
  const [drivers, setDrivers] = useState([]);
  const [newDriver, setNewDriver] = useState({
    name: '',
    licenseNumber: '',
    age: '',
    address: '',
    cnic: '',
    email: '',
    phoneNumber: '',
  });
  const [editingIndex, setEditingIndex] = useState(-1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDriver((prevDriver) => ({ ...prevDriver, [name]: value }));
  };

  const handleAddDriver = () => {
    if (editingIndex === -1) {
      // Add a new driver
      setDrivers((prevDrivers) => [...prevDrivers, newDriver]);
    } else {
      // Update the existing driver
      setDrivers((prevDrivers) => {
        const updatedDrivers = [...prevDrivers];
        updatedDrivers[editingIndex] = newDriver;
        return updatedDrivers;
      });
      setEditingIndex(-1); // Reset editing index after update
    }

    // Clear the form
    setNewDriver({
      name: '',
      licenseNumber: '',
      age: '',
      address: '',
      cnic: '',
      email: '',
      phoneNumber: '',
    });
  };

  const handleEditDriver = (index) => {
    // Set the form fields with the data of the selected driver
    setNewDriver({ ...drivers[index] });
    setEditingIndex(index);
  };

  const handleDeleteDriver = (index) => {
    // Delete the selected driver
    setDrivers((prevDrivers) => {
      const updatedDrivers = [...prevDrivers];
      updatedDrivers.splice(index, 1);
      return updatedDrivers;
    });
  };

  return (
    <div className="container mt-4">
      <h2>Driver Manager</h2>
      <ul className="list-group">
        {drivers.map((driver, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            {driver.name} - {driver.licenseNumber} - {driver.age} years old - {driver.address} - CNIC: {driver.cnic} - Email: {driver.email} - Phone: {driver.phoneNumber}
            <div>
              <button
                type="button"
                className="btn btn-warning btn-sm mx-1"
                onClick={() => handleEditDriver(index)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteDriver(index)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <h3>{editingIndex === -1 ? 'Add New Driver' : 'Edit Driver'}</h3>
        <form>
        <form>
          <div className="mb-3">
            <label htmlFor="driverName" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="driverName"
              name="name"
              value={newDriver.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="licenseNumber" className="form-label">
              License Number:
            </label>
            <input
              type="text"
              className="form-control"
              id="licenseNumber"
              name="licenseNumber"
              value={newDriver.licenseNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Age:
            </label>
            <input
              type="text"
              className="form-control"
              id="age"
              name="age"
              value={newDriver.age}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address:
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={newDriver.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cnic" className="form-label">
              CNIC:
            </label>
            <input
              type="text"
              className="form-control"
              id="cnic"
              name="cnic"
              value={newDriver.cnic}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={newDriver.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number:
            </label>
            <input
              type="tel"
              className="form-control"
              id="phoneNumber"
              name="phoneNumber"
              value={newDriver.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
          {/* <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddDriver}
          >
            Add Driver
          </button> */}
        </form>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddDriver}
          >
            {editingIndex === -1 ? 'Add Driver' : 'Update Driver'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DriverManager;
