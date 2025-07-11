import { useState, useEffect } from 'react';
import './contactform.css';

interface ContactFormProps {
  onSubmit: (formData: any) => void;
  prefill?: {
    name?: string;
    surname?: string;
    email?: string;
    phone?: string;
  };
}

const ContactForm = ({ onSubmit, prefill }: ContactFormProps) => {
  const [form, setForm] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
  });

  // When prefill changes, update form state
  useEffect(() => {
    if (prefill) {
      setForm({
        name: prefill.name ?? '',
        surname: prefill.surname ?? '',
        email: prefill.email ?? '',
        phone: prefill.phone ?? '',
      });
    }
  }, [prefill]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="contact-form">
      <h3>Täytä yhteystiedot</h3>
      <input
        name="name"
        placeholder="Etunimi"
        value={form.name}
        onChange={handleChange}
      />
      <input
        name="surname"
        placeholder="Sukunimi"
        value={form.surname}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Sähköposti"
        value={form.email}
        onChange={handleChange}
      />
      <input
        name="phone"
        placeholder="Puhelinnumero"
        value={form.phone}
        onChange={handleChange}
      />
      <button onClick={() => onSubmit(form)}>Vahvista varaus</button>
    </div>
  );
};

export default ContactForm;
