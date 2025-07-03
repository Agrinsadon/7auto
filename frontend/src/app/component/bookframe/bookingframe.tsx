import RemoveButton from '../buttons/removebutton';
import './bookingframe.css';

interface BookingFrameProps {
  onClose: () => void;
}

const BookingFrame = ({ onClose }: BookingFrameProps) => {
  return (
    <div className="booking-frame-container">
      <div className="booking-frame">
        <RemoveButton onClick={onClose} />
      </div>
    </div>
  );
};

export default BookingFrame;
