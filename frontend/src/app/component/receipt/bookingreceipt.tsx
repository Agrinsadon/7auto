import './bookingreceipt.css';

interface Service {
  name: string;
  description: string;
  price: string;
}

interface Props {
  selectedServices: Service[];
}

const BookingReceipt = ({ selectedServices }: Props) => {
  return (
    <div className='receipt-container'>
      <p>Yhteenveto</p>
      <ul>
        {selectedServices.map((service, index) => (
          <li key={index}>
            <strong>{service.name}</strong> - {service.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingReceipt;
