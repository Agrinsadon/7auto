'use client';
import BookingFrame from './bookingframe';
import BookingWash from './bookingwash';
import BookButton from '../buttons/bookbutton';
import React, { useState } from 'react';
import Image from 'next/image';
import './bookingstart.css';

interface BookingStartProps {
  onClose: () => void;
}

const BookingHuoltoPesu = ({ onClose }: BookingStartProps) => {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <>
      {!showBooking ? (
        <BookingFrame onText="Valitse Varauspalvelu" onClose={onClose}>
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
                <BookButton
                  onClick={() => setShowBooking(true)}
                  onText="Varaa Pesu"
                />
              </div>
            </div>
          </div>
        </BookingFrame>
      ) : (
        <BookingWash goBack={() => setShowBooking(false)} onClose={onClose} />
      )}
    </>
  );
};

export default BookingHuoltoPesu;
