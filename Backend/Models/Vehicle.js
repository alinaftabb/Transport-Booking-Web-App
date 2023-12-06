const mongoose = require('mongoose');

const VehicleSchema = mongoose.Schema(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    type: { type: String, required: true },
   color: { type: String, required: true },
  },
  { collection: 'vehicles' }
);

module.exports = mongoose.model('Vehicle', VehicleSchema);
