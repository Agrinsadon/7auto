// calendar.ts
import { google } from 'googleapis';
import { Booking } from './types';
import dayjs from 'dayjs';
import dotenv from 'dotenv';

dotenv.config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

export const addEventToCalendar = async (booking: Booking) => {
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

  const dateTimeStart = dayjs(`${booking.date}T${booking.time}`);
  const dateTimeEnd = dateTimeStart.add(30, 'minute');

  const formattedDate = dateTimeStart.format('DD.MM.YYYY');

  const palveluNimet = booking.services.map(s => s.name).join(', ');
  const palveluHinta = booking.services
    .map(s => Number(s.price.replace('€', '').replace(',', '.')))
    .reduce((sum, price) => sum + price, 0)
    .toFixed(2)
    .replace('.', ',');

  const event = {
    summary: `Pesuvaraus - ${booking.contact.name} ${booking.contact.surname}`,
    description: `Palvelu(t): ${palveluNimet}
Päivämäärä: ${formattedDate}
Aika: ${booking.time}
Rekisterinumero: ${booking.contact.plate}
Hinta: ${palveluHinta} €`,
    start: {
      dateTime: dateTimeStart.toISOString(),
      timeZone: 'Europe/Helsinki',
    },
    end: {
      dateTime: dateTimeEnd.toISOString(),
      timeZone: 'Europe/Helsinki',
    },
    attendees: [
      {
        email: booking.contact.email,
      },
    ],
  };

  try {
    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
    });
    console.log('✅ Calendar event created:', response.data.htmlLink);
  } catch (error) {
    console.error('❌ Error creating calendar event:', error);
  }
};
