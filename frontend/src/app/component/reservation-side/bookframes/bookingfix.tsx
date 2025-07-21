'use client';
import React, { useState } from 'react';
import BookingFrame from './bookingframe';
import Calendar from '../calendar/calendar';
import ContactForm from '../contact/contactform';
import LastFrame from './lastframe';
import SuccessCheckmark from './completeframe'; // ✅ import animation
import './bookingwash.css';

interface BookingFixFlowProps {
  goBack: () => void;
  onClose: () => void;
  initialDescription: string;
}

const BookingFix = ({ goBack, onClose, initialDescription }: BookingFixFlowProps) => {
  const [description] = useState(initialDescription);
  const [step, setStep] = useState<'calendar' | 'contact' | 'confirm'>('calendar');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [contactInfo, setContactInfo] = useState<any>(null);
  const [isConfirmed, setIsConfirmed] = useState(false); // ✅ success state

  const handleDateTimeSelected = (date: Date, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setStep('contact');
  };

  const handleContactSubmit = (formData: any) => {
    setContactInfo(formData);
    setStep('confirm');
  };

  const handleFinalConfirm = async () => {
    const bookingPayload = {
      services: [
        {
          name: 'Huolto / Ongelma',
          price: '-',
          description: description,
        },
      ],
      date: selectedDate?.toISOString().split('T')[0],
      time: selectedTime,
      contact: contactInfo,
    };

    try {
      const response = await fetch('http://localhost:4000/api/book/fix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload),
      });

      if (response.ok) {
        setIsConfirmed(true); // ✅ show success screen
      } else {
        alert('Jokin meni pieleen varauksen kanssa. Yritä uudelleen.');
      }
    } catch (error) {
      console.error('Error sending booking:', error);
      alert('Virhe varauksen lähetyksessä.');
    }
  };

  const handleBack = () => {
    if (step === 'confirm') setStep('contact');
    else if (step === 'contact') setStep('calendar');
    else goBack();
  };

  const getStepText = () => {
    if (isConfirmed) return 'Kiitos, nähdään pian'; // ✅ show this on success
    switch (step) {
      case 'calendar': return 'Valitse Päivä & Aika';
      case 'contact': return 'Täytä Yhteystiedot';
      case 'confirm': return 'Tarkista ja vahvista';
      default: return '';
    }
  };

  return (
    <BookingFrame
      onText={getStepText()}
      onBack={handleBack}
      onClose={onClose}
      disableBack={isConfirmed} // ✅ disables button, keeps it visible
    >
      <div
        style={{
          margin: '0 auto',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {step === 'calendar' && (
          <Calendar
            onDateTimeSelected={handleDateTimeSelected}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            setSelectedDate={setSelectedDate}
            setSelectedTime={setSelectedTime}
            bookingType="fix"
          />
        )}

        {step === 'contact' && (
          <ContactForm onSubmit={handleContactSubmit} prefill={contactInfo} />
        )}
      </div>

      {step === 'confirm' && selectedDate && selectedTime && contactInfo && (
        isConfirmed ? (
          <SuccessCheckmark />
        ) : (
          <LastFrame
            selectedServices={[
              {
                name: 'Huolto / Ongelma',
                description: description,
                price: '',
              },
            ]}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            contact={contactInfo}
            onConfirm={handleFinalConfirm}
          />
        )
      )}
    </BookingFrame>
  );
};

export default BookingFix;
