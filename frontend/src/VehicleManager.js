// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import './App.css';

// const VehicleManager = () => {
//   const [vehicles, setVehicles] = useState([]);
//   const [newVehicle, setNewVehicle] = useState({
//     name: '',
//     plateNumber: '',
//     registrationNumber: '',
//     vehicleType: '',
//   });
//   const [editingIndex, setEditingIndex] = useState(-1);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewVehicle((prevVehicle) => ({ ...prevVehicle, [name]: value }));
//   };

//   const handleAddVehicle = () => {
//     if (editingIndex === -1) {
//       // Add a new vehicle
//       setVehicles((prevVehicles) => [...prevVehicles, newVehicle]);
//     } else {
//       // Update the existing vehicle
//       setVehicles((prevVehicles) => {
//         const updatedVehicles = [...prevVehicles];
//         updatedVehicles[editingIndex] = newVehicle;
//         return updatedVehicles;
//       });
//       setEditingIndex(-1); // Reset editing index after update
//     }

//     // Clear the form
//     setNewVehicle({
//       name: '',
//       plateNumber: '',
//       registrationNumber: '',
//       vehicleType: '',
//     });
//   };

//   const handleEditVehicle = (index) => {
//     // Set the form fields with the data of the selected vehicle
//     setNewVehicle({ ...vehicles[index] });
//     setEditingIndex(index);
//   };

//   const handleDeleteVehicle = (index) => {
//     // Delete the selected vehicle
//     setVehicles((prevVehicles) => {
//       const updatedVehicles = [...prevVehicles];
//       updatedVehicles.splice(index, 1);
//       return updatedVehicles;
//     });
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Vehicle Manager</h2>
//       <ul className="list-group">
//         {vehicles.map((vehicle, index) => (
//           <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
//             {vehicle.name} - {vehicle.plateNumber} - {vehicle.registrationNumber} - {vehicle.vehicleType}
//             <div>
//               <button
//                 type="button"
//                 className="btn btn-warning btn-sm mx-1"
//                 onClick={() => handleEditVehicle(index)}
//               >
//                 Edit
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-danger btn-sm"
//                 onClick={() => handleDeleteVehicle(index)}
//               >
//                 Delete
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//       <div className="mt-4">
//         <h3>{editingIndex === -1 ? 'Add New Vehicle' : 'Edit Vehicle'}</h3>
//         <form>
//         <form>
//           <div className="mb-3">
//             <label htmlFor="vehicleName" className="form-label">
//               Vehicle Name:
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="vehicleName"
//               name="name"
//               value={newVehicle.name}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="plateNumber" className="form-label">
//               Plate Number:
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="plateNumber"
//               name="plateNumber"
//               value={newVehicle.plateNumber}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="registrationNumber" className="form-label">
//               Registration Number:
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="registrationNumber"
//               name="registrationNumber"
//               value={newVehicle.registrationNumber}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="vehicleType" className="form-label">
//               Vehicle Type:
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="vehicleType"
//               name="vehicleType"
//               value={newVehicle.vehicleType}
//               onChange={handleInputChange}
//             />
//           </div>
//           {/* <button
//             type="button"
//             className="btn btn-primary"
//             onClick={handleAddVehicle}
//           >
//             Add Vehicle
//           </button> */}
//         </form>
//           <button
//             type="button"
//             className="btn btn-primary"
//             onClick={handleAddVehicle}
//           >
//             {editingIndex === -1 ? 'Add Vehicle' : 'Update Vehicle'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default VehicleManager;








import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const VehicleManager = () => {
  const [vehicles, setVehicles] = useState([]);
  const [newVehicle, setNewVehicle] = useState({
    make: '',
    model: '',
   year: '',
    type: '',
  });
  const [editingIndex, setEditingIndex] = useState(-1);

  const handleInputChange = (e) => { // Define handleInputChange function
    setNewVehicle((prevNext) => ({
      ...prevNext,
      [e.target.name]: e.target.value,
    }));
  };



  const handleAddVehicle = (e) => {
    e.preventDefault();
    console.log(newVehicle);
    if (editingIndex === -1) {
      axios
        .post('http://localhost:5000/vehicle', newVehicle)
        .then((res) => {
          console.log(res.data);
          setNewVehicle({
            make: '',
            model: '',
            year: '',
            type: '',
          });
          fetchVehicles();
        })
        .catch((error) => {
          console.error('Error adding vehicle:', error);
        });
    } else {
      axios
        .patch(`http://localhost:5000/vehicle/${vehicles[editingIndex]._id}`, newVehicle)
        .then((res) => {
          console.log(res.data);
          setNewVehicle({
            make: '',
            model: '',
            year: '',
            type: '',
          });
          setEditingIndex(-1); // Reset editingIndex after update
          fetchVehicles();
        })
        .catch((error) => {
          console.error('Error updating vehicle:', error);
        });
    }
  };

  const fetchVehicles = () => {
    axios
      .get('http://localhost:5000/vehicle')
      .then((response) => {
        setVehicles(response.data.vehicles || []);
      })
      .catch((error) => {
        console.error('Error fetching vehicles:', error);
      });
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleEditVehicle = (index) => {
    setNewVehicle({ ...vehicles[index] });
    setEditingIndex(index);
  };

  const handleDeleteVehicle = (index) => {
    axios
      .delete(`http://localhost:5000/vehicle/${vehicles[index]._id}`)
      .then((res) => {
        console.log(res.data);
        fetchVehicles();
      })
      .catch((error) => {
        console.error('Error deleting vehicle:', error);
      });
  };

  return (
    <div className="container mt-4">
      <h2>Vehicle Manager</h2>
      <ul className="list-group">
        {vehicles.map((vehicle, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            {vehicle.make} - {vehicle.model} - {vehicle.year} - {vehicle.type}
            <div>
              <button
                type="button"
                className="btn btn-warning btn-sm mx-1"
                onClick={() => handleEditVehicle(index)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteVehicle(index)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <h3>{editingIndex === -1 ? 'Add New Vehicle' : 'Edit Vehicle'}</h3>
        <form>
        <form>
          <div className="mb-3">
            <label htmlFor="vehicleName" className="form-label">
              Vehicle Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="vehicleName"
              name="make"
              value={newVehicle.make}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="plateNumber" className="form-label">
              Plate Number:
            </label>
            <input
              type="text"
              className="form-control"
              id="plateNumber"
              name="model"
              value={newVehicle.model}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="registrationNumber" className="form-label">
              Registration Number:
            </label>
            <input
              type="text"
              className="form-control"
              id="registrationNumber"
              name="year"
              value={newVehicle.year}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="vehicleType" className="form-label">
              Vehicle Type:
            </label>
            <input
              type="text"
              className="form-control"
              id="vehicleType"
              name="type"
              value={newVehicle.type}
              onChange={handleInputChange}
            />
          </div>
          {/* <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddVehicle}
          >
            Add Vehicle
          </button> */}
        </form>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddVehicle}
          >
            {editingIndex === -1 ? 'Add Vehicle' : 'Update Vehicle'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VehicleManager;