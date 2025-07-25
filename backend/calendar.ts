import { google } from 'googleapis';
import { Booking } from './types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import dotenv from 'dotenv';

dotenv.config();

dayjs.extend(utc);
dayjs.extend(timezone);

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

export const addEventToCalendar = async (booking: Booking, type: 'wash' | 'fix') => {
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

  // Parse date with explicit Helsinki timezone
  const dateTimeStart = dayjs.tz(`${booking.date}T${booking.time}`, 'Europe/Helsinki');
  const dateTimeEnd = dateTimeStart.add(30, 'minute');
  const formattedDate = dateTimeStart.format('DD.MM.YYYY');
  const palveluNimet = booking.services.map(s => s.name).join(', ');

  const isFix = type === 'fix';
  const palveluHinta = isFix
    ? null
    : booking.services
        .map(s => Number(s.price.replace('€', '').replace(',', '.')))
        .reduce((sum, price) => sum + price, 0)
        .toFixed(2)
        .replace('.', ',');

  const event = {
    summary: `${isFix ? 'Huoltovaraus' : 'Pesuvaraus'} - ${booking.contact.name} ${booking.contact.surname}`,
    description: `Palvelu(t): ${palveluNimet}
Päivämäärä: ${formattedDate}
Aika: ${booking.time}
Rekisterinumero: ${booking.contact.plate}
${isFix && booking.services[0]?.description ? `Ongelma: ${booking.services[0].description}\n` : ''}
${!isFix ? `Hinta: ${palveluHinta} €` : ''}`,
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
    extendedProperties: {
      private: {
        type,
      },
    },
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

export const getCalendarEvents = async () => {
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

  const now = dayjs().tz('Europe/Helsinki').toISOString();

  const response = await calendar.events.list({
    calendarId: 'primary',
    timeMin: now,
    maxResults: 100,
    singleEvents: true,
    orderBy: 'startTime',
    timeZone: 'Europe/Helsinki'
  });

  return (response.data.items || []).map(event => ({
    id: event.id,
    summary: event.summary,
    description: event.description,
    start: event.start?.dateTime,
    end: event.end?.dateTime,
    type: event.extendedProperties?.private?.type ?? 'unknown',
  }));
};