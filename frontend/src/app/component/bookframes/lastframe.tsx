import './lastframe.css';

interface Service {
  name: string;
  description: string;
  price: string;
}

interface Props {
  selectedServices: Service[];
  selectedDate: Date;
  selectedTime: string;
  contact: {
    name: string;
    surname: string;
    email: string;
    phone: string;
  };
  onConfirm: () => void;
}

const LastFrame = ({ selectedServices, selectedDate, selectedTime, contact, onConfirm }: Props) => {
  const formattedDate = selectedDate.toLocaleDateString('fi-FI', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="lastframe-container">
      <h2>Vahvista varaus</h2>

      <div className="section">
        <h3>Palvelut</h3>
        <ul>
          {selectedServices.map((service, idx) => (
            <li key={idx}>
              <strong>{service.name}</strong> – {service.price}
              <br />
              <span className="desc">{service.description}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h3>Aika ja päivä</h3>
        <p><strong>{formattedDate}</strong> klo <strong>{selectedTime}</strong></p>
      </div>

      <div className="section">
        <h3>Yhteystiedot</h3>
        <p><strong>Nimi:</strong> {contact.name} {contact.surname}</p>
        <p><strong>Sähköposti:</strong> {contact.email}</p>
        <p><strong>Puhelin:</strong> {contact.phone}</p>
      </div>

      <button className="confirm-button" onClick={onConfirm}>Vahvista varaus</button>
    </div>
  );
};

export default LastFrame;
