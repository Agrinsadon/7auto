import BookButton from '../buttons/bookbutton';
import RemoveButton from '../buttons/removebutton';
import './bookingframe.css';

interface BookingFrameProps {
  onClose: () => void;
}

const BookingFrame = ({ onClose }: BookingFrameProps) => {
  return (
    <div className="booking-frame-container">
      <div className="booking-frame">
        <div className="booking-frame-header">
        <RemoveButton onClick={onClose} onText='Valitse Varauspalvelu' />
        </div>
        <div className="booking-frame-content">
            <BookButton onClick={() => alert('Varaus tehty!')} onText='Varaa Huolto' />
            <BookButton onClick={() => alert('Varaus tehty!')} onText='Varaa Pesu' />
        </div>

      </div>
    </div>
  );
};

export default BookingFrame;
