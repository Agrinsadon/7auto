import React, { useEffect } from 'react';
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

  const today = new Date();
  const minBookDate = new Date(today);
  minBookDate.setHours(0, 0, 0, 0);
  minBookDate.setDate(minBookDate.getDate() + 14);

  useEffect(() => {
    if (!selectedDate || selectedDate < minBookDate) {
      setSelectedDate(minBookDate);
    }
    if (
      currentDate.getFullYear() !== minBookDate.getFullYear() ||
      currentDate.getMonth() !== minBookDate.getMonth()
    ) {
      setCurrentDate(new Date(minBookDate.getFullYear(), minBookDate.getMonth(), 1));
    }
  }, []);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const startDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const adjustedStart = startDay === 0 ? 6 : startDay - 1;

  const generateTimeSlots = (start = "08:00", end = "16:00") => {
    const slots: string[] = [];
    let [hour, minute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);

    while (hour < endHour || (hour === endHour && minute <= endMinute)) {
      const hStr = hour.toString().padStart(2, "0");
      const mStr = minute.toString().padStart(2, "0");
      slots.push(`${hStr}:${mStr}`);
      minute += 30;
      if (minute >= 60) {
        minute = 0;
        hour++;
      }
    }
    return slots;
  };

  const handleDateClick = (date: Date) => {
    if (date < minBookDate) return;
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (slot: string) => {
    if (selectedDate) {
      setSelectedTime(slot);
      onDateTimeSelected(selectedDate, slot);
    }
  };

  return (
    <div className="calendar-wrapper">
      <div className="calendar-header">
        <button
          onClick={() =>
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
          }
        >
          {'<'}
        </button>
        <span>
          {currentDate.toLocaleString('default', { month: 'long' })}{' '}
          <strong>{currentDate.getFullYear()}</strong>
        </span>
        <button
          onClick={() =>
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
          }
        >
          {'>'}
        </button>
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
          const disabled = date < minBookDate;

          return (
            <div
              key={day}
              className={`calendar-day ${
                selectedDate?.toDateString() === date.toDateString() ? 'selected-day' : ''
              } ${disabled ? 'disabled-day' : ''}`}
              onClick={() => handleDateClick(date)}
            >
              {day}
            </div>
          );
        })}
      </div>

      {selectedDate && (
        <div className="timeslot-grid">
          {generateTimeSlots().map(slot => (
            <div className="timeslot-container" key={slot}>
              <div
                className={`timeslot ${selectedTime === slot ? 'selected-slot' : ''}`}
                data-time={slot}
                onClick={() => handleTimeSelect(slot)}
              />
              {slot.endsWith(':00') && (
                <div className="timeslot-label">{slot}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Calendar;
