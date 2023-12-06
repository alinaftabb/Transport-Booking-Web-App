const express = require('express');
const authRoutes = require('./Routes/Auth');
const bookingRoutes = require('./Routes/Booking');
const vehicleRoutes = require('./Routes/Vehicle');
const driverRoutes = require('./Routes/Driver');
const connectDB = require('./db');
const cors = require('cors');



connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/auth', authRoutes);
app.use('/booking', bookingRoutes);
app.use('/vehicle', vehicleRoutes);
app.use('/driver', driverRoutes);

app.listen(5000, () => {
  console.log('App is running on port 5000');
});
