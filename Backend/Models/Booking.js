const mongoose = require('mongoose');

const BookingSchema = mongoose.Schema(
  {
    date: { type: String, required: true },
    time: { type: String, required: true },
    pickup: { type: String, required: true },
    destination: { type: String, required: true },
    approved: { type: Boolean, required: true },
    fare: { type: Number },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
  },
  { collection: 'bookings' }
);

module.exports = mongoose.model('Booking', BookingSchema);
