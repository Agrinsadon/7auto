'use client';
import BookingFrame from './bookingframe';
import BookingWash from './bookingwash';
import BookButton from '../buttons/bookbutton';
import React, { useState } from 'react';
import Image from 'next/image';
import './bookingstart.css';

const BookingHuoltoPesu = () => {
  const [showBooking, setShowBooking] = useState(false);

  const handleBookingClick = () => {
    setShowBooking(true);
  };

  return (
    <BookingFrame onText="Valitse Varauspalvelu">
      <div className="booking-start-content">
        <div className="booking-side">
          <Image
            src="/carfix.png"
            alt="Huolto background"
            fill
            className="booking-bg"
            priority
          />
          <div className="overlay" />
          <div className="booking-button-wrapper">
            <BookButton
              onClick={() => alert('Varaus tehty!')}
              onText="Varaa Huolto"
            />
          </div>
        </div>

        <div className="booking-side">
          <Image
            src="/carwash.png"
            alt="Pesu background"
            fill
            className="booking-bg"
            priority
          />
          <div className="overlay" />
          <div className="booking-button-wrapper">
            <BookButton onClick={handleBookingClick} onText="Varaa Pesu" />
          </div>
          {showBooking && <BookingWash />}
        </div>
      </div>
    </BookingFrame>
  );
};

export default BookingHuoltoPesu;
