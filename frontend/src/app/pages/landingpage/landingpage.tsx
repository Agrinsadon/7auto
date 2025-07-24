"use client";
import React, { useState } from 'react';
import './landingpage.css';
import BookButton from '../../component/buttons/bookbutton'; 
import BookingWash from '@/app/component/reservation-side/bookframes/bookingwash';
import BookingFixStart from '@/app/component/reservation-side/bookframes/bookingfixstart';
import BookingStart from '@/app/component/reservation-side/bookframes/bookingstart';

const LandingPage = () => {
  const [isBookingWashOpen, setIsBookingWashOpen] = useState(false);
  const [isBookingFixOpen, setIsBookingFixOpen] = useState(false);
  const [isBookingServicesOpen, setIsBookingServicesOpen] = useState(false);

  const handleCloseWash = () => setIsBookingWashOpen(false);
  const handleCloseFix = () => setIsBookingFixOpen(false);

  const handleCloseServices = () => setIsBookingServicesOpen(false);

  const handleOpenWash = () => setIsBookingWashOpen(true);
  const handleOpenFix = () => setIsBookingFixOpen(true);

  const handleOpenServices = () => setIsBookingServicesOpen(true);

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

      {isBookingServicesOpen && (
          <BookingStart
            onClose={handleCloseServices}
          />
        )}

    </div>
    <div className="landing-text-frame">
    <p className='under-text'>Tarjoamme huollot ja pesut kätevästi saman katon alta. Olipa kyse öljynvaihdosta, jarrujen tarkistuksesta tai perusteellisesta sisä- ja ulkopesusta, hoidamme kaiken luotettavasti yhdestä osoitteesta. Käytämme laadukkaita tuotteita ja nykyaikaisia menetelmiä, jotta autosi on parhaassa mahdollisessa kunnossa sekä sisältä että ulkoa.</p>
    <p 
      className="booking-link" 
      onClick={handleOpenServices}
    >
      Katso vapaat ajat&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→
    </p>


    </div>
    </>
  );
};

export default LandingPage;
