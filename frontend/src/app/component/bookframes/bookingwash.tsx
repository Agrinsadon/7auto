import { useState } from "react";
import Categorybar from "../bars/categoryBar";
import BookingReceipt from "../receipt/bookingreceipt";
import BookingFrame from "./bookingframe";
import "./bookingwash.css";
import ServiceBar from "../bars/serviceBar";
import Calendar from "../calendar/calendar";

interface Service {
  name: string;
  description: string;
  price: string;
  category: string;
}

const BookingWash = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleServiceSelect = (service: Service) => {
    setSelectedServices(prev => [...prev, service]);
    setShowCalendar(true); // Näytetään kalenteri kun palvelu valittu
  };

  return (
    <BookingFrame onText={
      !selectedCategory ? "Valitse Kategoria"
      : showCalendar ? "Valitse Päivä & Aika"
      : "Valitse Palvelu"
    }>
      <div className="booking-wash-content">
        <div className="booking-category-side">
          {!selectedCategory ? (
            <Categorybar onSelectCategory={handleCategorySelect} />
          ) : !showCalendar ? (
            <ServiceBar selectedCategory={selectedCategory} onServiceSelect={handleServiceSelect} />
          ) : (
            <Calendar />
          )}
        </div>
        <div className="booking-separator"></div>
        <div className="booking-receipt-side">
          <BookingReceipt selectedServices={selectedServices} />
        </div>
      </div>
    </BookingFrame>
  );
};

export default BookingWash;
