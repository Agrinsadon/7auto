import React from 'react';
import './contactpage.css';

const Contact: React.FC = () => {
  return (
    <div className="contact-container">
      <h1 className="heading">Contact Us</h1>
      <form className="form">
        <div className="form-group">
          <label className="label" htmlFor="name">Name</label>
          <input className="input" type="text" id="name" name="name" required />
        </div>

        <div className="form-group">
          <label className="label" htmlFor="email">Email</label>
          <input className="input" type="email" id="email" name="email" required />
        </div>

        <div className="form-group">
          <label className="label" htmlFor="message">Message</label>
          <textarea className="textarea" id="message" name="message" rows={5} required></textarea>
        </div>

        <button className="button" type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
