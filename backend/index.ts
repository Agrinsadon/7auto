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

// Wash booking endpoint
app.post('/api/book/wash', async (req, res) => {
  try {
    const booking = req.body;
    console.log('📨 Received washing booking:', booking);

    await sendBookingEmail(booking, 'wash');
    await addEventToCalendar(booking, 'wash');

    res.status(200).json({ message: 'Washing booking processed successfully' });
  } catch (error) {
    console.error('Washing booking error:', error);
    res.status(500).json({ message: 'Washing booking failed', error });
  }
});

app.post('/api/book/fix', async (req, res) => {
  try {
    const booking = req.body;
    console.log('Received fix booking:', booking);

    await sendBookingEmail(booking, 'fix');
    await addEventToCalendar(booking, 'fix');

    res.status(200).json({ message: 'Fix booking processed successfully' });
  } catch (error) {
    console.error('Fix booking error:', error);
    res.status(500).json({ message: 'Fix booking failed', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
