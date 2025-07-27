"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import BookButton from '../buttons/bookbutton';
import BookingStart from '../reservation-side/bookframes/bookingstart';
import Hamburger from '../buttons/hamburger'; // adjust the path
import './navbar.css';

const Navbar = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = () => setIsBookingOpen(true);
  const handleClose = () => setIsBookingOpen(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <>
      <div className='navbarwrapper'>
        <nav className='navbar'>
          <div className='navbarcontainer'>
            <div className='navbarlogo'>
              <Link href="/">
                <img src="/isam.png" alt="Company Logo" className='logoimg' />
              </Link>
            </div>

            <div className='navright'>
              <div className='navbarlinks'>
                <Link href="/huolto" className='navlink'>Huolto</Link>
                <Link href="/pesu" className='navlink'>Pesu</Link>
                <Link href="/yhteystiedot" className='navlink'>Yhteystiedot</Link>
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

          {/* Mobile Menu Overlay */}
          {menuOpen && (
            <div className="mobilemenu">
              <Link href="/huolto" className='mobilelink' onClick={toggleMenu}>Huolto</Link>
              <Link href="/pesu" className='mobilelink' onClick={toggleMenu}>Pesu</Link>
              <Link href="/yhteystiedot" className='mobilelink' onClick={toggleMenu}>Yhteystiedot</Link>
              <BookButton
                onClick={() => {
                  handleClick();
                  toggleMenu();
                }}
                onText="Varaa aika"
                variant="dark"
              />
            </div>
          )}
        </nav>
      </div>

      {isBookingOpen && <BookingStart onClose={handleClose} />}
    </>
  );
};

export default Navbar;
