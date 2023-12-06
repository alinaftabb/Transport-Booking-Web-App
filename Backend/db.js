const mongoose = require('mongoose');
require('dotenv').config();

// Connecting mongoDB Database
const connectDB = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(x => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Error connecting to MongoDB'));
};

module.exports = connectDB;
