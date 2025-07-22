"use client";
import React, { useState } from 'react';
import './landingpage.css';
import BookButton from '../../component/buttons/bookbutton'; 
import BookingWash from '@/app/component/reservation-side/bookframes/bookingwash';
import BookingFixStart from '@/app/component/reservation-side/bookframes/bookingfixstart';

const LandingPage = () => {
  const [isBookingWashOpen, setIsBookingWashOpen] = useState(false);
  const [isBookingFixOpen, setIsBookingFixOpen] = useState(false);

  const handleCloseWash = () => setIsBookingWashOpen(false);
  const handleCloseFix = () => setIsBookingFixOpen(false);

  const handleOpenWash = () => setIsBookingWashOpen(true);
  const handleOpenFix = () => setIsBookingFixOpen(true);

  return (
    <>
    <div className="image-frame">
      <img
        src="/carimage.png"
        alt="Landing"
        className="image-size"
      />
      <div className="button-overlay">
        <BookButton
          onClick={handleOpenFix}
          onText="Varaa huolto"
          variant="light-stay"
          size="large"
        />
        <BookButton
          onClick={handleOpenWash}
          onText="Varaa pesu"
          variant="dark-stay"
          size="large"
        />
      </div>

      {isBookingWashOpen && (
        <BookingWash
          onClose={handleCloseWash}
          goBack={handleCloseWash}
        />
      )}

      {isBookingFixOpen && (
        <BookingFixStart
          onClose={handleCloseFix}
          goBack={handleCloseFix}
        />
      )}

    </div>
    <p className='under-text'>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
    </>
  );
};

export default LandingPage;
