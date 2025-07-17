import nodemailer from 'nodemailer';
import 'dotenv/config';
import { Booking } from './types';

export const sendBookingEmail = async (booking: Booking) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.RECEIVER_EMAIL,
    subject: 'Uusi Pesuvaraus',
    html: `
      <h2>Uusi varaus saapunut!</h2>
      <p><strong>Palvelu:</strong> ${booking.services.map(s => s.name).join(', ')}</p>
      <p><strong>Päivä:</strong> ${booking.date}</p>
      <p><strong>Aika:</strong> ${booking.time}</p>
      <p><strong>Nimi:</strong> ${booking.contact.name} ${booking.contact.surname}</p>
      <p><strong>Email:</strong> ${booking.contact.email}</p>
      <p><strong>Puhelin:</strong> ${booking.contact.phone}</p>
      <p><strong>Rekisterinumero:</strong> ${booking.contact.plate}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
