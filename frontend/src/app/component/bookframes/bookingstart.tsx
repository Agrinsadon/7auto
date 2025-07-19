'use client';
import BookingFrame from './bookingframe';
import BookingWash from './bookingwash';
import BookingFix from './bookingfixstart'; // ✅ Import your new BookingFix
import BookButton from '../buttons/bookbutton';
import React, { useState } from 'react';
import Image from 'next/image';
import './bookingstart.css';

interface BookingStartProps {
  onClose: () => void;
}

// Track the selected booking type
type BookingType = 'none' | 'wash' | 'fix';

const BookingHuoltoPesu = ({ onClose }: BookingStartProps) => {
  const [bookingType, setBookingType] = useState<BookingType>('none');

  const goBack = () => setBookingType('none');

  return (
    <>
      {bookingType === 'none' ? (
        <BookingFrame onText="Valitse Varauspalvelu" onClose={onClose}>
          <div className="booking-start-content">
            {/* Huolto */}
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
                  onClick={() => setBookingType('fix')}
                  onText="Varaa Huolto"
                />
              </div>
            </div>

            {/* Pesu */}
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
                  onClick={() => setBookingType('wash')}
                  onText="Varaa Pesu"
                />
              </div>
            </div>
          </div>
        </BookingFrame>
      ) : bookingType === 'wash' ? (
        <BookingWash goBack={goBack} onClose={onClose} />
      ) : (
        <BookingFix goBack={goBack} onClose={onClose} />
      )}
    </>
  );
};

export default BookingHuoltoPesu;
