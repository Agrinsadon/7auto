import { useState, useEffect } from 'react';
import './contactform.css';
import BookButton from '../buttons/bookbutton';

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
    plate: '', // 👈 added
  });

  useEffect(() => {
    if (prefill) {
      setForm({
        name: prefill.name ?? '',
        surname: prefill.surname ?? '',
        email: prefill.email ?? '',
        phone: prefill.phone ?? '',
        plate: prefill.plate ?? '', // 👈 added
      });
    }
  }, [prefill]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="contact-form">
      <div className="contact-form-row">
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

      <div className="contact-button">
        <BookButton
          onClick={() => onSubmit(form)}
          onText="Vahvista varaus"
          variant="light"
          size="small"
        />
      </div>
    </div>
  );
};

export default ContactForm;
