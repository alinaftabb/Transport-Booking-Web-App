import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';  // Import Header from the correct file

import SignUp from './components/SignUp';
import Login from './components/Login';
import BookingForm from './components/BookingForm';
import BookingStatus from './components/BookingStatus';
import Payment from './components/Payment';
import Tracking from './components/Tracking';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="travel-app">
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/status" element={<BookingStatus />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/tracking" element={<Tracking />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default AppRouter;
