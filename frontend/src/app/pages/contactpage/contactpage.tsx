import { useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import '../../component/reservation-side/contact/contactform.css';
import './contactpage.css';
import BookButton from '../../component/buttons/bookbutton';

const SimpleContactForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [hasError, setHasError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (hasError) setHasError(false);
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setHasError(true);
      return;
    }

    try {
      const res = await fetch('http://localhost:4000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Failed to send');

      alert('Viesti lähetetty onnistuneesti!');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      alert('Viestin lähetys epäonnistui. Yritä myöhemmin uudelleen.');
    }
  };

  return (
    <div className="contact-form-container">
      <div className="contact-form-header">
        <h2>Ota meihin yhteyttä</h2>
        <div className="contact-form-description">
          <p>
            Autamme mielellämme kaikissa huoltoon ja pesuun liittyvissä kysymyksissä. Voit myös antaa
            palautetta lomakkeella. Vastaamme mahdollisimman nopeasti, usein jo saman päivän aikana.
          </p>
        </div>

        <div className="contact-form-line"></div>

        <div className="contact-form-info">
          <div className="contact-info-item">
            <MapPin size={20} />
            <a
              href="https://www.google.com/maps?q=Esimerkkikatu+1,+00100+Helsinki"
              target="_blank"
              rel="noopener noreferrer"
            >
              Esimerkkikatu 1, 00100 Helsinki
            </a>
          </div>
          <div className="contact-info-item">
            <Phone size={20} />
            <a href="tel:+358401234567">+358 40 123 4567</a>
          </div>
          <div className="contact-info-item">
            <Mail size={20} />
            <a href="mailto:info@esimerkki.fi">info@esimerkki.fi</a>
          </div>
        </div>
      </div>

      <div className="contact-form">
        <div className="booking-contact-form-row">
          <div className={`floating-label ${form.name ? 'active' : ''}`}>
            <input
              name="name"
              id="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="name">Nimi*</label>
          </div>
        </div>

        <div className={`floating-label ${form.email ? 'active' : ''}`}>
          <input
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Sähköposti*</label>
        </div>

        <div className={`floating-label ${form.message ? 'active' : ''}`}>
          <input
            name="message"
            id="message"
            value={form.message}
            onChange={handleChange}
            required
          />
          <label htmlFor="message">Viesti*</label>
        </div>

        <div className="booking-contact-button-wrapper">
          <BookButton
            onClick={handleSubmit}
            onText="lähetä viesti"
            variant="light"
            size="small"
          />
          {hasError && <span className="booking-error-text">Täytä kaikki kentät</span>}
        </div>
      </div>
    </div>
  );
};

export default SimpleContactForm;
