import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const RouteManager = () => {
  const [routes, setRoutes] = useState([]);
  const [newRoute, setNewRoute] = useState({ name: '', departure: '', destination: '', fare: 0 });
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoute((prevRoute) => ({ ...prevRoute, [name]: value }));
  };

  const handleAddRoute = () => {
    if (editIndex !== null) {
      // If editIndex is not null, update the existing route
      setRoutes((prevRoutes) =>
        prevRoutes.map((route, index) =>
          index === editIndex ? { ...route, ...newRoute } : route
        )
      );
      setEditIndex(null);
    } else {
      // Add a new route
      setRoutes((prevRoutes) => [...prevRoutes, newRoute]);
    }
    // Clear the form
    setNewRoute({ name: '', departure: '', destination: '', fare: 0 });
  };

  const handleEditRoute = (index) => {
    // Set the form fields with the values of the route being edited
    setNewRoute({ ...routes[index] });
    setEditIndex(index);
  };

  const handleDeleteRoute = (index) => {
    // Remove the route at the specified index
    setRoutes((prevRoutes) => prevRoutes.filter((_, i) => i !== index));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Route Manager</h2>
      <div className="mb-4">
        <h3>Add/Edit Route</h3>
        <form>
          <div className="mb-3">
            <label htmlFor="routeName" className="form-label">
              Route Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="routeName"
              name="name"
              value={newRoute.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="routeDeparture" className="form-label">
              Departure:
            </label>
            <input
              type="text"
              className="form-control"
              id="routeDeparture"
              name="departure"
              value={newRoute.departure}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="routeDestination" className="form-label">
              Destination:
            </label>
            <input
              type="text"
              className="form-control"
              id="routeDestination"
              name="destination"
              value={newRoute.destination}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="routeFare" className="form-label">
              Route Fare:
            </label>
            <input
              type="number"
              className="form-control"
              id="routeFare"
              name="fare"
              value={newRoute.fare}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddRoute}
          >
            {editIndex !== null ? 'Update Route' : 'Add Route'}
          </button>
        </form>
      </div>
      <h3>Routes</h3>
      <ul className="list-group">
        {routes.map((route, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            {route.name} - Departure: {route.departure} - Destination: {route.destination} - Fare: {route.fare}
            <div>
              <button
                type="button"
                className="btn btn-warning mx-1"
                onClick={() => handleEditRoute(index)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger mx-1"
                onClick={() => handleDeleteRoute(index)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RouteManager;