"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import './landingpage.css';
import BookButton from '../../component/buttons/bookbutton'; 
import BookingWash from '@/app/component/reservation-side/bookframes/bookingwash';
import BookingFixStart from '@/app/component/reservation-side/bookframes/bookingfixstart';
import BookingStart from '@/app/component/reservation-side/bookframes/bookingstart';

const LandingPage = () => {
  const [isBookingWashOpen, setIsBookingWashOpen] = useState(false);
  const [isBookingFixOpen, setIsBookingFixOpen] = useState(false);
  const [isBookingServicesOpen, setIsBookingServicesOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleCloseWash = () => setIsBookingWashOpen(false);
  const handleCloseFix = () => setIsBookingFixOpen(false);
  const handleCloseServices = () => setIsBookingServicesOpen(false);
  const handleOpenWash = () => setIsBookingWashOpen(true);
  const handleOpenFix = () => setIsBookingFixOpen(true);
  const handleOpenServices = () => setIsBookingServicesOpen(true);

  // Check screen width
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 760);
    };

    checkMobile(); // run on mount
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      <div className="image-frame">
        <Image
          src={isMobile ? "/mobile.png" : "/carimage.png"}
          alt="Landing"
          className="image-size"
          fill
          priority
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
          <BookingStart onClose={handleCloseServices} />
        )}
      </div>

      <div className="landing-text-frame">
        <p className='under-text'>
          Tarjoamme huollot ja pesut kätevästi saman katon alta. Olipa kyse öljynvaihdosta, jarrujen tarkistuksesta tai perusteellisesta sisä- ja ulkopesusta, hoidamme kaiken luotettavasti yhdestä osoitteesta. 
          <br/><br/>  
          Käytämme laadukkaita tuotteita ja nykyaikaisia menetelmiä, jotta autosi on parhaassa mahdollisessa kunnossa sekä sisältä että ulkoa.
        </p>
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
