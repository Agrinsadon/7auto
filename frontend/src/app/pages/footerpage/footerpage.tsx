'use client';

import { useState } from 'react';
import BookingWash from '@/app/component/reservation-side/bookframes/bookingwash';
import BookingFix from '@/app/component/reservation-side/bookframes/bookingfixstart';

import Image from 'next/image';
import './footerpage.css';
import {
  Facebook,
  Instagram,
  MapPin,
  Mail,
  Phone,
} from 'lucide-react';

const Footer = () => {
  const [activeBooking, setActiveBooking] = useState<'huolto' | 'pesu' | null>(null);

  return (
    <>
      <footer className="main-page-footer">
        <div className="main-page-footer-left">
          <div className="main-page-footer-logo">
            <div className="main-page-footer-logo-wrapper">
              <Image
                src="/logo-black.png"
                alt="7auto Logo"
                width={150}
                height={40}
                className="main-page-footer-logo-img"
                priority
              />
            </div>
          </div>
          <p className='main-page-footer-text'>Yksi pysähdys, täysi huolenpito</p>

          <div className="main-page-footer-socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram size={24} />
            </a>
          </div>

          <p className="main-page-footer-copy">© 2025 Copyright 7auto Oy</p>
        </div>

        <div className="main-page-footer-right">
          <div className="main-page-footer-booking">
            <h4 className="main-page-footer-title">Varaa aika</h4>
            <p>
              <button
                onClick={() => setActiveBooking('huolto')}
                className="main-page-footer-link"
              >
                Huolto
              </button>
            </p>
            <p>
              <button
                onClick={() => setActiveBooking('pesu')}
                className="main-page-footer-link"
              >
                Pesu
              </button>
            </p>
          </div>

          <div className="main-page-footer-hours">
            <h4 className="main-page-footer-title">Aukioloajat</h4>
            <p>Ma - Pe | 08:00 - 18:00</p>
            <p>La | 10:00 - 14:00</p>
            <p>Su | Suljettu</p>
          </div>

          <div className="main-page-footer-contact">
            <h4 className="main-page-footer-title">7auto</h4>
            <p>Y-tunnus: 1234567-8</p>

            <div className="main-page-footer-info">
              <MapPin size={16} />
              <a
                href="https://www.google.com/maps/place/Helsinki,+Finland"
                target="_blank"
                rel="noopener noreferrer"
              >
                Helsinki, Finland
              </a>
            </div>

            <div className="main-page-footer-info">
              <Mail size={16} />
              <a href="mailto:7auto.tuki@gmail.com">7auto.tuki@gmail.com</a>
            </div>

            <div className="main-page-footer-info">
              <Phone size={16} />
              <a href="tel:+358401234567">+358 40 123 4567</a>
            </div>
          </div>
        </div>
      </footer>

      {activeBooking === 'huolto' && (
        <BookingFix
          goBack={() => setActiveBooking(null)}
          onClose={() => setActiveBooking(null)}
        />
      )}
      {activeBooking === 'pesu' && (
        <BookingWash
          goBack={() => setActiveBooking(null)}
          onClose={() => setActiveBooking(null)}
        />
      )}
    </>
  );
};

export default Footer;
