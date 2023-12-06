const express = require('express');
const router = express.Router();
const Driver = require('../Models/Driver');
const { authenticateJWT, checkUserRole } = require('../utils');

// Create a Driver
router.post('/', authenticateJWT, checkUserRole('Admin'), (req, res) => {
  if (!req.body.name || !req.body.age || !req.body.licenseNumber) {
    res.json({
      success: false,
      error: 'Please fill in all required fields!',
    });
    return;
  }

  Driver.create({
    name: req.body.name,
    age: req.body.age,
    licenseNumber: req.body.licenseNumber,
  })
    .then(driver => res.json({ success: true, message: 'Driver created!' }))
    .catch(err =>
      res.json({ success: false, error: 'Driver creation failed!' })
    );
});

// Get all Drivers
router.get('/', authenticateJWT, checkUserRole('Admin'), (req, res) => {
  Driver.find()
    .then(driver => res.json({ driver: driver }))
    .catch(err => res.json({ success: false, error: err.message }));
});

// Get Driver by ID
router.get('/:id', authenticateJWT, checkUserRole('Admin'), (req, res) => {
  Driver.findById(req.params.id)
    .then(driver => {
      if (driver) {
        res.json({ driver: driver });
      } else {
        res.status(404).json({ error: 'Driver not found' });
      }
    })
    .catch(err => res.json({ success: false, error: err.message }));
});

// Update a Driver by ID
router.patch('/:id', authenticateJWT, checkUserRole('Admin'), (req, res) => {
  Driver.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedDriver => {
      if (updatedDriver) {
        res.json({ driver: updatedDriver, message: 'Driver deleted' });
      } else {
        res.status(404).json({ error: 'Driver not found' });
      }
    })
    .catch(err => res.status(400).json({ error: err.message }));
});

// Delete a Driver by ID
router.delete('/:id', authenticateJWT, checkUserRole('Admin'), (req, res) => {
  Driver.findByIdAndDelete(req.params.id)
    .then(deletedDriver => {
      if (deletedDriver) {
        res.json({ message: 'Driver deleted' });
      } else {
        res.status(404).json({ error: 'Driver not found' });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
