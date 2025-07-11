import './bookingreceipt.css';

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
  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString('fi-FI', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <div className='receipt-container'>
      <p><strong>Yhteenveto</strong></p>
      
      <ul>
        {selectedServices.map((service, index) => (
          <li key={index}>
            <strong>{service.name}</strong> – {service.price}
          </li>
        ))}
      </ul>

      {selectedDate && selectedTime && (
        <div className="receipt-datetime">
          <p><strong>Päivä:</strong> {formattedDate}</p>
          <p><strong>Aika:</strong> {selectedTime}</p>
        </div>
      )}
    </div>
  );
};

export default BookingReceipt;
