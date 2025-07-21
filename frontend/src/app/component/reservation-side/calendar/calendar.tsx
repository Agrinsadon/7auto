import React, { useEffect, useState } from 'react';
import './calendar.css';

const weekdays = ['MA', 'TI', 'KE', 'TO', 'PE', 'LA', 'SU'];

interface CalendarProps {
  onDateTimeSelected: (date: Date, time: string) => void;
  selectedDate: Date | null;
  selectedTime: string | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setSelectedTime: React.Dispatch<React.SetStateAction<string | null>>;
  bookingType: 'wash' | 'fix';
}

interface CalendarEvent {
  start: string;
  type: string;
}

const Calendar = ({
  onDateTimeSelected,
  selectedDate,
  selectedTime,
  setSelectedDate,
  setSelectedTime,
  bookingType,
}: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookedSlots, setBookedSlots] = useState<{ [key: string]: string[] }>({});

  const today = new Date();
  const minBookDate = new Date(today);
  minBookDate.setHours(0, 0, 0, 0);
  minBookDate.setDate(minBookDate.getDate() + 14);

  // Fetch booked calendar events
  useEffect(() => {
    const fetchBookedEvents = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/calendar/events');
        const data: CalendarEvent[] = await res.json();

        const slotsByDate: { [key: string]: string[] } = {};

        data.forEach(event => {
          if (event.type !== bookingType) return;

          const dateTime = new Date(event.start);
          // Convert to local timezone for display
          const localDate = new Date(dateTime.getTime() + dateTime.getTimezoneOffset() * 60000);
          const dateKey = localDate.toISOString().split('T')[0];
          const time = localDate.toTimeString().slice(0, 5); // HH:mm

          if (!slotsByDate[dateKey]) slotsByDate[dateKey] = [];
          slotsByDate[dateKey].push(time);
        });

        setBookedSlots(slotsByDate);
      } catch (err) {
        console.error('Failed to fetch calendar events:', err);
      }
    };

    fetchBookedEvents();
  }, [bookingType]);

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
      // Create date with time in local timezone
      const [hours, minutes] = slot.split(':').map(Number);
      const dateWithTime = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        hours,
        minutes
      );
      
      setSelectedTime(slot);
      onDateTimeSelected(dateWithTime, slot);
    }
  };

  const isTimeDisabled = (time: string): boolean => {
    if (!selectedDate) return false;
    // Use local date string for comparison
    const dateKey = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate()
    ).toISOString().split('T')[0];
    return bookedSlots[dateKey]?.includes(time) ?? false;
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
          {generateTimeSlots().map(slot => {
            const isDisabled = isTimeDisabled(slot);

            return (
              <div className="timeslot-container" key={slot}>
                <div
                  className={`timeslot ${selectedTime === slot ? 'selected-slot' : ''} ${
                    isDisabled ? 'disabled-slot' : ''
                  }`}
                  data-time={slot}
                  onClick={() => !isDisabled && handleTimeSelect(slot)}
                />
                {slot.endsWith(':00') && (
                  <div className="timeslot-label">{slot}</div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Calendar;
