"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import BookButton from '../buttons/bookbutton';
import BookingStart from '../reservation-side/bookframes/bookingstart';
import './navbar.css';

const Navbar = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleClick = () => setIsBookingOpen(true);
  const handleClose = () => setIsBookingOpen(false);

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
            </div>
          </div>
        </nav>
      </div>

      {isBookingOpen && <BookingStart onClose={handleClose} />}
    </>
  );
};

export default Navbar;
