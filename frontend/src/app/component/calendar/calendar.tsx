import React, { useEffect, useState } from 'react';
import './calendar.css';
import { initGoogleCalendar, fetchCalendarEvents } from './googlecalendar';

const weekdays = ['MA', 'TI', 'KE', 'TO', 'PE', 'LA', 'SU'];

interface CalendarEvent {
  start: { dateTime: string };
  end: { dateTime: string };
}

const BookingCalendar = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    initGoogleCalendar(async () => {
      const calendarEvents = await fetchCalendarEvents();
      setEvents(calendarEvents as CalendarEvent[]);
    });
  }, []);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const startDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const adjustedStart = startDay === 0 ? 6 : startDay - 1;

  const isDateAvailable = (day: number) => {
    const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0];
    const hasEvent = events.some(e => e.start.dateTime.startsWith(dateStr));
    return !hasEvent;
  };

  return (
    <div className="calendar-wrapper">
      {/* HEADER */}
      <div className="calendar-header">
        <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}>{'<'}</button>
        <span>
          {currentDate.toLocaleString('default', { month: 'long' })}{' '}
          <strong>{currentDate.getFullYear()}</strong>
        </span>
        <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}>{'>'}</button>
      </div>

      {/* WEEKDAYS */}
      <div className="weekday-row">
        {weekdays.map((day, i) => (
          <div key={i} className="weekday">{day}</div>
        ))}
      </div>

      {/* DAYS GRID */}
      <div className="calendar-grid">
        {Array.from({ length: adjustedStart }).map((_, i) => (
          <div key={`empty-${i}`} className="calendar-day empty" />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const available = isDateAvailable(day);
          return (
            <div
              key={day}
              className={`calendar-day ${available ? 'available-day' : 'unavailable-day'}`}
              onClick={() => available && setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
            >
              {day}
              <div className={`availability-bar ${available ? 'green' : 'red'}`} />
            </div>
          );
        })}
      </div>

      {/* TIME SLOTS */}
      {selectedDate && (
        <>    
          <div className="timeslot-grid">
            {["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:30"].map(slot => (
              <div
                key={slot}
                className={`timeslot ${selectedTime === slot ? 'selected-slot' : ''}`}
                onClick={() => setSelectedTime(slot)}
              >
                {slot}
              </div>
            ))}
          </div>
        </>
      )}

      {selectedTime && (
        <div className="selected-time-box">
          VALITTU<br />{selectedTime}
        </div>
      )}
    </div>
  );
};

export default BookingCalendar;
