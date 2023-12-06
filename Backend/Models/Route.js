const mongoose = require('mongoose');

// Define Mongoose Schema for Routes
const routeSchema = new mongoose.Schema({
        pickupLocation: String,
        destination: String,
        distance: Number,
        fare: Number
  });

  module.exports = mongoose.model('Route', routeSchema);
  