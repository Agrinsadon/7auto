import React from 'react';
import './calendar.css';

const weekdays = ['MA', 'TI', 'KE', 'TO', 'PE', 'LA', 'SU'];

interface CalendarProps {
  onDateTimeSelected: (date: Date, time: string) => void;
  selectedDate: Date | null;
  selectedTime: string | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setSelectedTime: React.Dispatch<React.SetStateAction<string | null>>;
}

const Calendar = ({
  onDateTimeSelected,
  selectedDate,
  selectedTime,
  setSelectedDate,
  setSelectedTime,
}: CalendarProps) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const startDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const adjustedStart = startDay === 0 ? 6 : startDay - 1;

  const handleTimeSelect = (slot: string) => {
    if (selectedDate) {
      setSelectedTime(slot);
      onDateTimeSelected(selectedDate, slot);
    }
  };

  return (
    <div className="calendar-wrapper">
      <div className="calendar-header">
        <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}>{'<'}</button>
        <span>
          {currentDate.toLocaleString('default', { month: 'long' })}{' '}
          <strong>{currentDate.getFullYear()}</strong>
        </span>
        <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}>{'>'}</button>
      </div>

      <div className="weekday-row">
        {weekdays.map((day, i) => (
          <div key={i} className="weekday">{day}</div>
        ))}
      </div>

      <div className="calendar-grid">
        {Array.from({ length: adjustedStart }).map((_, i) => (
          <div key={`empty-${i}`} className="calendar-day empty" />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
          return (
            <div
              key={day}
              className={`calendar-day ${
                selectedDate?.getDate() === day && selectedDate?.getMonth() === currentDate.getMonth()
                  ? 'selected'
                  : ''
              }`}
              onClick={() => setSelectedDate(date)}
            >
              {day}
            </div>
          );
        })}
      </div>

      {selectedDate && (
        <div className="timeslot-grid">
          {["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:30"].map(slot => (
            <div
              key={slot}
              className={`timeslot ${selectedTime === slot ? 'selected-slot' : ''}`}
              onClick={() => handleTimeSelect(slot)}
            >
              {slot}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Calendar;
