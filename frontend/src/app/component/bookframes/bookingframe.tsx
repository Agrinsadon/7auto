import './bookingframe.css';
import RemoveButton from '../buttons/removebutton';

interface BookingFrameProps {
  onText?: string;
  onBack?: () => void;
  onClose?: () => void;
  disableBack?: boolean;
  children?: React.ReactNode;
}

const BookingFrame = ({ onText, onBack, onClose, disableBack = false, children }: BookingFrameProps) => {
  return (
    <div className="booking-frame-container">
      <div className="booking-frame">
        <div className="booking-frame-header">
          {onText && <p>{onText}</p>}
          {onClose && <RemoveButton onClick={onClose} />}
        </div>
        {children}
        <div className="booking-frame-footer">
          <div className="footer-left">
            <button
              className="footer-button"
              onClick={disableBack ? undefined : onBack}
              disabled={disableBack}
              style={{
                opacity: disableBack ? 0.5 : 1,
                cursor: disableBack ? 'not-allowed' : 'pointer',
              }}
            >
              ← takaisin
            </button>
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
