// mailer.ts
import nodemailer from 'nodemailer';
import 'dotenv/config';
import { Booking } from './types';
import dayjs from 'dayjs';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export const sendBookingEmail = async (booking: Booking) => {
  const palveluNimet = booking.services.map(s => s.name).join(', ');
  const palveluHinta = booking.services
    .map(s => Number(s.price.replace('€', '').replace(',', '.')))
    .reduce((sum, price) => sum + price, 0)
    .toFixed(2)
    .replace('.', ',');

  const formattedDate = dayjs(booking.date).format('DD.MM.YYYY');

  const companyName = "Yritys Oy";
  const companyPhone = "+358 40 123 4567";
  const companyEmail = "info@yritys.fi";
  const companyAddress = "Pesukatu 12, 00100 Helsinki";

  // Yritykselle
  const mailOptionsToBusiness = {
    from: process.env.GMAIL_USER,
    to: process.env.RECEIVER_EMAIL,
    subject: 'Uusi Pesuvaraus',
    html: `
      <h2>Uusi varaus saapunut!</h2>
      <p><strong>Asiakas:</strong> ${booking.contact.name} ${booking.contact.surname}</p>
      <p><strong>Email:</strong> ${booking.contact.email}</p>
      <p><strong>Puhelin:</strong> ${booking.contact.phone}</p>
      <p><strong>Palvelu:</strong> ${palveluNimet}</p>
      <p><strong>Hinta:</strong> ${palveluHinta} €</p>
      <p><strong>Päivä:</strong> ${formattedDate}</p>
      <p><strong>Aika:</strong> ${booking.time}</p>
      <p><strong>Rekisterinumero:</strong> ${booking.contact.plate}</p>
    `,
  };

  await transporter.sendMail(mailOptionsToBusiness);

  // Asiakkaalle
  const mailOptionsToCustomer = {
    from: process.env.GMAIL_USER,
    to: booking.contact.email,
    subject: 'Vahvistus: Pesuvaraus vastaanotettu',
    html: `
      <h2>Kiitos varauksestasi!</h2>
      <p>Olemme vastaanottaneet varauksesi seuraaville tiedoille:</p>
      <ul>
        <li><strong>Palvelu:</strong> ${palveluNimet}</li>
        <li><strong>Hinta:</strong> ${palveluHinta} €</li>
        <li><strong>Päivä:</strong> ${formattedDate}</li>
        <li><strong>Aika:</strong> ${booking.time}</li>
        <li><strong>Rekisterinumero:</strong> ${booking.contact.plate}</li>
      </ul>
      <p>Tämä varaus on lisätty Google-kalenteriisi, jos käytät Gmail-osoitetta.</p>

      <hr />
      <p style="font-size: 14px;">
        Mikäli sinulla on kysyttävää tai tarvitset apua varaukseesi liittyen, olethan meihin yhteydessä:
        <br /><br />
        <strong>${companyName}</strong><br />
        Osoite: ${companyAddress}<br />
        Puhelin: ${companyPhone}<br />
        Sähköposti: ${companyEmail}
      </p>

      <p style="font-size: 13px; color: #888;">Tämä on automaattinen viesti — älä vastaa tähän sähköpostiin.</p>
    `,
  };

  await transporter.sendMail(mailOptionsToCustomer);
};
