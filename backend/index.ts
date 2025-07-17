import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { sendBookingEmail } from './mailer';
import { addEventToCalendar } from './calendar';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Booking API');
});

app.post('/api/book', async (req, res) => {
  try {
    const booking = req.body;

    await sendBookingEmail(booking);
    await addEventToCalendar(booking);

    res.status(200).json({ message: 'Booking processed successfully' });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ message: 'Booking failed', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});