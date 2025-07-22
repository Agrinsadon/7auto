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
    if (hasError) setHasError(false); // clear error on change
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
        <input
          name="name"
          placeholder="Etunimi*"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="surname"
          placeholder="Sukunimi*"
          value={form.surname}
          onChange={handleChange}
        />
      </div>

      <input
        name="email"
        placeholder="Sähköposti*"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="phone"
        placeholder="Puhelinnumero*"
        value={form.phone}
        onChange={handleChange}
      />

      <input
        name="plate"
        placeholder="Rekisterinumero*"
        value={form.plate}
        onChange={handleChange}
      />

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
