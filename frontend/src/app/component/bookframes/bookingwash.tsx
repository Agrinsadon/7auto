import Categorybar from "../bars/categoryBar";
import BookingReceipt from "../receipt/bookingreceipt";
import BookingFrame from "./bookingframe";
import "./bookingwash.css";

const BookingWash = () => {
    return (
        <BookingFrame onText="Valitse Pesu Palvelu">
        <div className="booking-wash-content">
            <div className="booking-category-side">
            <Categorybar />
            </div>
            <div className="booking-receipt-side">
            <BookingReceipt />
            </div>
        </div>
        </BookingFrame>
    );
}

export default BookingWash;