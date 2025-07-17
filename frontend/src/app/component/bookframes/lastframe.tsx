import BookButton from '../buttons/bookbutton';
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
    plate: string | number;
  };
  onConfirm: () => void;
}

const LastFrame = ({ selectedServices, selectedDate, selectedTime, contact, onConfirm }: Props) => {
  const formattedDate = selectedDate.toLocaleDateString('fi-FI', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  return (
    <div className="lastframe-container">
      <div className="section">
        <h3 className='detail-header'>Palvelut</h3>
        <p>
          {selectedServices.map((service, idx) => (
            <p key={idx}>
              <strong>{service.name}</strong>: {service.price}
              <br />
              <span className="desc">{service.description}</span>
            </p>
          ))}
        </p>
      </div>

      <div className="section">
        <h3 className='detail-header'>Aika ja päivä</h3>
        <p><strong>{formattedDate}</strong>, klo: <strong>{selectedTime}</strong></p>
      </div>

      <div className="section">
        <h3 className='detail-header'>Yhteystiedot</h3>
        <p><strong>Nimi:</strong> {contact.name} {contact.surname}</p>
        <p><strong>Sähköposti:</strong> {contact.email}</p>
        <p><strong>Puhelin:</strong> {contact.phone}</p>
        <p><strong>Rekisteritunnus:</strong> {contact.plate}</p>
      </div>

      <div className="bottom-section">
        <p className='bottom-text'>Tarkista varauksesi tiedot. Voit palata takaisin muokkaamaan niitä tai napsauttaa lähetä-painiketta vahvistaaksesi varauksesi.</p>
        <div className='last-button'>
        <BookButton onClick={onConfirm} onText='Lähetä varaus' variant='light'></BookButton>
        </div>
      </div>
    </div>
  );
};

export default LastFrame;
