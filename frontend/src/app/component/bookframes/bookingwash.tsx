import { useState } from "react";
import Categorybar from "../bars/categoryBar";
import BookingReceipt from "../receipt/bookingreceipt";
import BookingFrame from "./bookingframe";
import "./bookingwash.css";
import ServiceBar from "../bars/serviceBar";

interface Service {
  name: string;
  description: string;
  price: string;
  category: string;
}

const BookingWash = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleServiceSelect = (service: Service) => {
    setSelectedServices(prev => [...prev, service]);
  };

  return (
    <BookingFrame onText={selectedCategory ? "Valitse Palvelu" : "Valitse Kategoria"}>
      <div className="booking-wash-content">
        <div className="booking-category-side">
          {!selectedCategory ? (
            <Categorybar onSelectCategory={handleCategorySelect} />
          ) : (
            <ServiceBar selectedCategory={selectedCategory} onServiceSelect={handleServiceSelect} />
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
