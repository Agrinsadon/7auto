import RemoveButton from '../buttons/removebutton';
import './bookingframe.css';

interface BookingFrameProps {
  onClose: () => void;
  onText?: string;
  children?: React.ReactNode;
}

const BookingFrame = ({ onClose, onText, children }: BookingFrameProps) => {
  return (
    <div className="booking-frame-container">
      <div className="booking-frame">
        <div className="booking-frame-header">
          <p>{onText}</p>
          <RemoveButton onClick={onClose} />
        </div>
        <div className="booking-frame-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BookingFrame;
