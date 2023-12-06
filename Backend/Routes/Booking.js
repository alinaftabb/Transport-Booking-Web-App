const express = require('express');
const router = express.Router();
const Booking = require('../Models/Booking');
const { authenticateJWT, checkUserRole } = require('../utils');

// Create Booking
router.post('/', authenticateJWT, checkUserRole('Customer'), (req, res) => {
  if (
    !req.body.date ||
    !req.body.time ||
    !req.body.pickup ||
    !req.body.destination
  ) {
    res.json({
      success: false,
      error: 'Please fill in all required fields!',
    });
    return;
  }

  Booking.create({
    date: req.body.date,
    time: req.body.time,
    pickup: req.body.pickup,
    destination: req.body.destination,
    approved: false,
  })
    .then(booking => res.json({ success: true, message: 'Booking Successful' }))
    .catch(err => res.json({ success: false, error: err }));
});

// Get All Bookings
router.get('/', authenticateJWT, checkUserRole('Admin'), (req, res) => {
  Booking.find()
    .then(booking => res.json({ booking: booking }))
    .catch(err => res.json({ success: false, error: err }));
});

// Approve the Booking Request
router.patch('/:id', authenticateJWT, checkUserRole('Admin'), (req, res) => {
  Booking.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(booking =>
      res.json({ success: true, message: 'Boooking request approved' })
    )
    .catch(err => res.json({ success: false, error: err }));
});

module.exports = router;
