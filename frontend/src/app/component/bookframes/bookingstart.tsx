import BookingFrame from './bookingframe';
import BookButton from '../buttons/bookbutton';

const BookingHuoltoPesu = ({ onClose }: { onClose: () => void }) => {
  return (
    <BookingFrame onClose={onClose} onText="Valitse Varauspalvelu">
      <BookButton onClick={() => alert('Varaus tehty!')} onText="Varaa Huolto" />
      <BookButton onClick={() => alert('Varaus tehty!')} onText="Varaa Pesu" />
    </BookingFrame>
  );
};

export default BookingHuoltoPesu;
