'use client';
import React, { useState } from 'react';
import BookingFrame from './bookingframe';
import BookingFixFlow from './bookingfix';
import BookButton from '../buttons/bookbutton';
import './bookingfixstart.css';

interface BookingFixStartProps {
  onClose: () => void;
  goBack: () => void;
}

const BookingFixStart = ({ onClose, goBack }: BookingFixStartProps) => {
  const [showFlow, setShowFlow] = useState(false);
  const [description, setDescription] = useState('');

  const handleStart = () => {
    if (description.trim() === '') {
      alert('Kerro lyhyesti ongelmasta.');
      return;
    }
    setShowFlow(true);
  };

  return showFlow ? (
    <BookingFixFlow
      initialDescription={description}
      onClose={onClose}
      goBack={() => setShowFlow(false)}
    />
  ) : (
    <BookingFrame
      onText="Kerro lyhyesti huollosta tai ongelmasta"
      onClose={onClose}
      onBack={goBack}
    >
      <div className="booking-fixstart-container">
        <textarea
          placeholder="Kerro lyhyesti minkälaista huoltoa tai ongelmia on autossa"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="booking-fixstart-textarea"
        />
        <div className="booking-fixstart-button">
          <BookButton onClick={handleStart} onText="Seuraava" variant='light'/>
        </div>
      </div>
    </BookingFrame>
  );
};

export default BookingFixStart;
