'use client';
import BookingFrame from './bookingframe';
import BookButton from '../buttons/bookbutton';
import Image from 'next/image';
import './bookingstart.css';

const BookingHuoltoPesu = ({ onClose }: { onClose: () => void }) => {
  return (
    <BookingFrame onClose={onClose} onText="Valitse Varauspalvelu">
      <div className="booking-frame-content">
        <div className="booking-side">
          <Image
            src="/carfix.png"
            alt="Huolto background"
            fill
            className="booking-bg"
            priority
            style={{ borderBottomLeftRadius: '10px' }}
          />
          <div className="overlay" />
          <BookButton 
          onClick={() => alert('Varaus tehty!')} 
          onText="Varaa Huolto" />
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
          <BookButton onClick={() => alert('Varaus tehty!')} onText="Varaa Pesu" />
        </div>
      </div>
    </BookingFrame>
  );
};

export default BookingHuoltoPesu;
