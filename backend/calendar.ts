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
  const dateTimeEnd = dateTimeStart.add(1, 'hour');

  const event = {
    summary: `Pesuvaraus - ${booking.contact.name} ${booking.contact.surname}`,
    description: `Palvelu: ${booking.services.map(s => s.name).join(', ')}\nRekisterinumero: ${booking.contact.plate}`,
    start: { dateTime: dateTimeStart.toISOString(), timeZone: 'Europe/Helsinki' },
    end: { dateTime: dateTimeEnd.toISOString(), timeZone: 'Europe/Helsinki' },
  };

  await calendar.events.insert({ calendarId: 'primary', requestBody: event });
};
