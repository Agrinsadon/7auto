'use client';

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
  return (
    <footer className="footer">
      <div className="footer-left">
        {/* Logo */}
        <div className="footer-logo">
          <div className="footer-logo-wrapper">
            <Image
              src="/logo-black.png"
              alt="7auto Logo"
              width={150}
              height={40}
              className="footer-logo-img"
              priority
            />
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="footer-socials">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Facebook size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram size={24} />
          </a>
        </div>

        {/* Copyright */}
        <p className="footer-copy">© 2025 Copyright 7auto Oy</p>
      </div>

      <div className="footer-right">
      <div className="footer-hours">
          <h4 className="footer-title">Aukioloajat</h4>
          <p>Ma - Pe | 08:00 - 18:00</p>
          <p>La | 10:00 - 14:00</p>
          <p>Su | Suljettu</p>
        </div>
        <div className="footer-contact">
          <h4 className="footer-title">7auto</h4>
          <p>Y-tunnus: 1234567-8</p>

          <div className="footer-info">
            <MapPin size={16} />
            <a
              href="https://www.google.com/maps/place/Helsinki,+Finland"
              target="_blank"
              rel="noopener noreferrer"
            >
              Helsinki, Finland
            </a>
          </div>

          <div className="footer-info">
            <Mail size={16} />
            <a href="mailto:info@7auto.fi">info@7auto.fi</a>
          </div>

          <div className="footer-info">
            <Phone size={16} />
            <a href="tel:+358401234567">+358 40 123 4567</a>
          </div>
        </div>
        </div>
    </footer>
  );
};

export default Footer;
