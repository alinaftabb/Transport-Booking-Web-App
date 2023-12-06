const express = require('express');
const router = express.Router();
const Vehicle = require('../Models/Vehicle');
const { authenticateJWT, checkUserRole } = require('../utils');

// Create a vehicle
router.post('/', //authenticateJWT,
 //checkUserRole('Admin'), 
 (req, res) => {
  // if (
  //   !req.body.make ||
  //   !req.body.model ||
  //   !req.body.year ||
  //   !req.body.type 
  //   //!req.body.color
  // ) {
  //   res.json({
  //     success: false,
  //     error: 'Please fill in all required fields!',
  //   });
  //   return;
  // }

  Vehicle.create(
  req.body
  )
    .then(vehicle => res.json({ success: true, message: 'Vehicle created!' }))
    .catch(err =>
      res.json({ success: false, error: 'Vehicle creation failed!' })
    );
});

// Get all vehicles
router.get('/', authenticateJWT, checkUserRole('Admin'), (req, res) => {
  Vehicle.find()
    .then(vehicles => res.json({ vehicles: vehicles }))
    .catch(err => res.json({ success: false, error: err.message }));
});

// Get vehicles by ID
router.get('/:id', authenticateJWT, checkUserRole('Admin'), (req, res) => {
  Vehicle.findById(req.params.id)
    .then(vehicle => {
      if (vehicle) {
        res.json({ vehicle: vehicle });
      } else {
        res.status(404).json({ error: 'Vehicle not found' });
      }
    })
    .catch(err => res.json({ success: false, error: err.message }));
});

// Update a vehicle by ID
router.patch('/:id', authenticateJWT, checkUserRole('Admin'), (req, res) => {
  Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedVehicle => {
      if (updatedVehicle) {
        res.json({ vehicle: updatedVehicle, message: 'Vehicle deleted' });
      } else {
        res.status(404).json({ error: 'Vehicle not found' });
      }
    })
    .catch(err => res.status(400).json({ error: err.message }));
});

// Delete a vehicle by ID
router.delete('/:id', authenticateJWT, checkUserRole('Admin'), (req, res) => {
  Vehicle.findByIdAndDelete(req.params.id)
    .then(deletedVehicle => {
      if (deletedVehicle) {
        res.json({ message: 'Vehicle deleted' });
      } else {
        res.status(404).json({ error: 'Vehicle not found' });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
