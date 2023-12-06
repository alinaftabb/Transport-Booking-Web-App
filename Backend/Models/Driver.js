const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, default: 0 },
  licenseNumber: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Driver', driverSchema);
