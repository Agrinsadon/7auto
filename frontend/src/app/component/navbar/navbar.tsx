'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import BookButton from '../buttons/bookbutton';
import BookingStart from '../reservation-side/bookframes/bookingstart';
import Hamburger from '../buttons/hamburger';
import { MapPin, Mail, Phone } from 'lucide-react';
import './navbar.css';

const Navbar = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = () => setIsBookingOpen(true);
  const handleClose = () => setIsBookingOpen(false);
  const toggleMenu = () => setMenuOpen(prev => !prev);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <>
      <div className='navbarwrapper'>
        <nav className='navbar'>
          <div className='navbarcontainer'>
            <div className='navbarlogo'>
              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setMenuOpen(false);
                }}
              >
                <div className="logoimg-wrapper">
                  <Image
                    src="/logo.png"
                    alt="Company Logo"
                    width={120}
                    height={40}
                    className="logoimg"
                    priority
                  />
                </div>
              </a>
            </div>

            <div className='navright'>
              <div className='navbarlinks'>
                <a href="#huolto" className="navlink" onClick={(e) => handleAnchorClick(e, 'huolto')}>Huolto</a>
                <a href="#pesu" className="navlink" onClick={(e) => handleAnchorClick(e, 'pesu')}>Pesu</a>
                <a href="#yhteystiedot" className="navlink" onClick={(e) => handleAnchorClick(e, 'yhteystiedot')}>Yhteystiedot</a>
              </div>

              <div className='navbarcta'>
                <BookButton
                  onClick={handleClick}
                  onText="Varaa aika"
                  variant="light"
                />
              </div>

              <div className="hamburger-mobile">
                <Hamburger isOpen={menuOpen} onClick={toggleMenu} />
              </div>
            </div>
          </div>

          {menuOpen && (
            <div className="mobilemenu">
              <div className="mobilemenu-top">
                <a href="#huolto" className="mobilelink" onClick={(e) => handleAnchorClick(e, 'huolto')}>Huolto</a>
                <a href="#pesu" className="mobilelink" onClick={(e) => handleAnchorClick(e, 'pesu')}>Pesu</a>
                <a href="#yhteystiedot" className="mobilelink" onClick={(e) => handleAnchorClick(e, 'yhteystiedot')}>Yhteystiedot</a>

                <BookButton
                  onClick={() => {
                    handleClick();
                    toggleMenu();
                  }}
                  onText="Varaa aika"
                  variant="light"
                  size='small'
                />
              </div>

              <div className="mobilemenu-bottom">
                <a
                  href="https://maps.google.com/?q=Autokatu+7,+00100+Helsinki"
                  className="contactlink"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin className="contacticon" />
                  Autokatu 7, Helsinki
                </a>
                <a href="mailto:7auto.tuki@gmail.com" className="contactlink">
                  <Mail className="contacticon" />
                  7auto.tuki@gmail.com
                </a>
                <a href="tel:+358408282632" className="contactlink">
                  <Phone className="contacticon" />
                  +358 40 828 2632
                </a>
              </div>

            </div>
          )}
        </nav>
      </div>

      {isBookingOpen && <BookingStart onClose={handleClose} />}
    </>
  );
};

export default Navbar;
