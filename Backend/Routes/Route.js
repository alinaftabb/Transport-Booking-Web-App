const express = require('express');
const router = express.Router();
const Route = require('../Models/Route');
const { authenticateJWT, checkUserRole } = require('../utils');
const fuelPrice = 200;

// Create Route
router.post('/', (req, res) => {
      if (!req.body.pickupLocation || !req.body.destination || !req.body.distance) {
        res.json({
          success: false,
          error: 'Please fill in all required fields!',
        });
        return;
      } 
      Route.create({
        pickupLocation: req.body.pickupLocation,
        destination: req.body.destination,
        distance: req.body.distance,
        fare: calculateFare(req.body.distance) 
    })
      .then((route)=>res.json({ success: true, Route: route }))
      .catch(err=>res.json({ success: false, error: 'Route creation failed!' }))
   
  });
  
  const calculateFare = distance => distance * fuelPrice;
  
  // Read All Routes
  router.get('/', (req, res) => {
      Route.find()
      .then(route=>res.json({success: true, Routes: route}))
      .catch(err => res.json({ success: false, error: err.message }));
  });
  
  // Update Route
  router.patch('/:id',(req, res) => {
      Route.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      }).then(updatedRoute=>{
        if (updatedRoute) {
          res.json({ success: true, route: updatedRoute, message: 'Route Updated' });
        } else {
          res.status(404).json({success: false, error: 'Route not found' });
        }
      })      
      .catch(err => res.json({ success: false, error: err.message }));
  });
  
  
// Update fare for a specific route by its ID
router.put('/:id', (req, res) => {
  Route.findById(req.params.id)
    .then(route => {
      if (!route) {
        return res.status(404).json({ success: false, error: 'Route not found' });
      }

      route.fare = req.body.fare;
      return route.save();
    })
    .then(updatedRoute => {
      res.json({ success: true, message: 'Fare updated successfully', route: updatedRoute });
    })
    .catch(err => {
      res.status(500).json({ success: false, message: 'Error updating fare', error: err.message });
    });
});
    
// Delete Route
router.delete('/:id', (req, res) => {
  Route.findByIdAndDelete(req.params.id)
    .then(() => {
      res.json({ success: true, message: 'Route deleted successfully' });
    })
    .catch(error => {
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    });
});
  
module.exports = router;
  