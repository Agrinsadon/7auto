import RemoveButton from '../buttons/removebutton';
import './bookingframe.css';

interface BookingFrameProps {
  onText?: string;
  children?: React.ReactNode;
}

const BookingFrame = ({ onText, children }: BookingFrameProps) => {
  return (
    <div className="booking-frame-container">
      <div className="booking-frame">
        <div className="booking-frame-header">
          <p>{onText}</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default BookingFrame;
