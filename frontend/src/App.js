import React from 'react';
import VehicleManager from './VehicleManager';
import DriverManager from './DriverManager';
import BookingManager from './BookingManager'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <VehicleManager />
      {/* <DriverManager />
      <BookingManager /> */}
    </div>
  );
}

export default App;
