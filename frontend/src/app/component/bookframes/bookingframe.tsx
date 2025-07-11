import './bookingframe.css';

interface BookingFrameProps {
  onText?: string;
  onBack?: () => void;
  children?: React.ReactNode;
}

const BookingFrame = ({ onText, onBack, children }: BookingFrameProps) => {
  return (
    <div className="booking-frame-container">
      <div className="booking-frame">
        <div className="booking-frame-header">
          <p>{onText}</p>
        </div>
        {children}
        <div className="booking-frame-footer">
          <div className="footer-left">
            <button className="footer-button" onClick={onBack}>← takaisin</button>
          </div>
          <div className="footer-divider" />
          <div className="footer-right">
            <p>
              Tarvitsetko apua? Soita numeroon <strong>040 828 26322332</strong> tai lähetä sähköpostia osoitteeseen{' '}
              <strong>zäät.fi</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingFrame;