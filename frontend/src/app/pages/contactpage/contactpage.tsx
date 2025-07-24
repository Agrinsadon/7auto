import React from 'react';
import './contactpage.css';

const Contact: React.FC = () => {
  return (
    <div className="contact-container">
      <h1 className="contact-heading">Ota meihin yhteyttä</h1>
      <form className="form">
        <div className="booking-contact-form">
          <input className="input" type="text" id="name" name="name" placeholder='Nimi*'required />
        </div>

        <div className="booking-contact-form">
          <input className="input" type="email" id="email" name="email" placeholder='Sähköposti*' required />
        </div>

        <div className="booking-contact-form">
          <input className="input" id="message" name="message" placeholder='Viesti*' required></input>
        </div>

        <button className="button" type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
