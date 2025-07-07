import Categorybar from "../bars/categoryBar";
import BookingFrame from "./bookingframe";
import "./bookingwash.css";

const BookingWash = () => {
    return (
        <BookingFrame onText="Valitse Pesu Palvelu">
        <div className="booking-wash-content">
            <div className="booking-category-side">
            <Categorybar />
            </div>
        </div>
        </BookingFrame>
    );
}

export default BookingWash;