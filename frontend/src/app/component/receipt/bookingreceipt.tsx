import './bookingreceipt.css';
import { useEffect, useState } from 'react';

interface Service {
  name: string;
  description: string;
  price: string;
}

interface Props {
  selectedServices: Service[];
  selectedDate?: Date | null;
  selectedTime?: string | null;
}

const BookingReceipt = ({ selectedServices, selectedDate, selectedTime }: Props) => {
  const [showDateTime, setShowDateTime] = useState(false);
  const [showServices, setShowServices] = useState(false);

  useEffect(() => {
    if (selectedServices.length > 0) {
      const timeout = setTimeout(() => {
        setShowServices(true);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setShowServices(false);
    }
  }, [selectedServices]);

  useEffect(() => {
    if (selectedDate && selectedTime) {
      const timeout = setTimeout(() => {
        setShowDateTime(true);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setShowDateTime(false);
    }
  }, [selectedDate, selectedTime]);

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString('fi-FI', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      })
    : null;

  return (
    <div className="receipt-container">
      <div className="booking-receipt-title-line">
        <div className="line" />
        <span className="booking-receipt-header">Yhteenveto</span>
        <div className="line" />
      </div>

      {/* Services List */}
      <div
        className="receipt-services"
        style={{
          opacity: showServices ? 1 : 0,
          transform: showServices ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}
      >
        <ul>
          {selectedServices.map((service, index) => (
            <p key={index}>
              - {service.name}: {service.price}
            </p>
          ))}
        </ul>
      </div>

      <br />

      {/* Date + Time */}
      <div
        className="receipt-datetime"
        style={{
          opacity: showDateTime ? 1 : 0,
          transform: showDateTime ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
          height: showDateTime ? 'auto' : 0,
          overflow: 'hidden',
        }}
      >
        {selectedDate && selectedTime && (
          <>
            <p>- Päivä: {formattedDate}</p>
            <br />
            <p>- Aika: {selectedTime}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingReceipt;
