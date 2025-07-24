import { useState, useEffect } from 'react';
import './contactform.css';
import BookButton from '../../buttons/bookbutton';

interface ContactFormProps {
  onSubmit: (formData: any) => void;
  prefill?: {
    name?: string;
    surname?: string;
    email?: string;
    phone?: string;
    plate?: string;
  };
}

const ContactForm = ({ onSubmit, prefill }: ContactFormProps) => {
  const [form, setForm] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    plate: '',
  });

  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (prefill) {
      setForm({
        name: prefill.name ?? '',
        surname: prefill.surname ?? '',
        email: prefill.email ?? '',
        phone: prefill.phone ?? '',
        plate: prefill.plate ?? '',
      });
    }
  }, [prefill]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (hasError) setHasError(false);
  };

  const handleSubmit = () => {
    if (
      !form.name.trim() ||
      !form.surname.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.plate.trim()
    ) {
      setHasError(true);
      return;
    }

    setHasError(false);
    onSubmit(form);
  };

  return (
    <div className="booking-contact-form">
      <div className="booking-contact-form-row">
        <div className={`floating-label ${form.name ? 'active' : ''}`}>
          <input
            name="name"
            id="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="name">Etunimi*</label>
        </div>
        <div className={`floating-label ${form.surname ? 'active' : ''}`}>
          <input
            name="surname"
            id="surname"
            value={form.surname}
            onChange={handleChange}
            required
          />
          <label htmlFor="surname">Sukunimi*</label>
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

      <div className={`floating-label ${form.phone ? 'active' : ''}`}>
        <input
          name="phone"
          id="phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <label htmlFor="phone">Puhelinnumero*</label>
      </div>

      <div className={`floating-label ${form.plate ? 'active' : ''}`}>
        <input
          name="plate"
          id="plate"
          value={form.plate}
          onChange={handleChange}
          required
        />
        <label htmlFor="plate">Rekisterinumero*</label>
      </div>

      <div className="booking-contact-button-wrapper">
        <BookButton
          onClick={handleSubmit}
          onText="Vahvista tiedot"
          variant="light"
          size="small"
        />
        {hasError && <span className="booking-error-text">Täytä kaikki</span>}
      </div>
    </div>
  );
};

export default ContactForm;
