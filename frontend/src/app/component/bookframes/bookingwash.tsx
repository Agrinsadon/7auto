import { useState } from "react";
import Categorybar from "../bars/categoryBar";
import BookingReceipt from "../receipt/bookingreceipt";
import BookingFrame from "./bookingframe";
import "./bookingwash.css";
import ServiceBar from "../bars/serviceBar";
import Calendar from "../calendar/calendar";  // Make sure this matches the filename/component name
import ContactForm from "../contact/contactform";
import LastFrame from "./lastframe";

interface Service {
  name: string;
  description: string;
  price: string;
  category: string;
}

interface BookingWashProps {
  goBack: () => void;
}

type Step = "category" | "service" | "calendar" | "contact" | "confirm";

const BookingWash = ({ goBack }: BookingWashProps) => {
  const [currentStep, setCurrentStep] = useState<Step>("category");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [contactInfo, setContactInfo] = useState<any>(null);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentStep("service");
  };

  const handleServiceSelect = (service: Service) => {
    setSelectedServices(prev => [...prev, service]);
    setCurrentStep("calendar");
  };

  const handleDateTimeSelected = (date: Date, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setCurrentStep("contact");
  };

  const handleContactSubmit = (formData: any) => {
    setContactInfo(formData);
    setCurrentStep("confirm");
  };

  const handleFinalConfirm = () => {
    console.log('✅ Varaus valmis:', {
      services: selectedServices,
      date: selectedDate,
      time: selectedTime,
      contact: contactInfo,
    });
    alert('Kiitos varauksesta! Saat vahvistuksen sähköpostiin.');
  };

  const handleBack = () => {
    if (currentStep === "confirm") setCurrentStep("contact");
    else if (currentStep === "contact") setCurrentStep("calendar");
    else if (currentStep === "calendar") setCurrentStep("service");
    else if (currentStep === "service") setCurrentStep("category");
    else goBack();
  };

  return (
    <BookingFrame
      onText={
        currentStep === "category"
          ? "Valitse Kategoria"
          : currentStep === "service"
          ? "Valitse Palvelu"
          : currentStep === "calendar"
          ? "Valitse Päivä & Aika"
          : currentStep === "contact"
          ? "Täytä Yhteystiedot"
          : "Tarkista ja vahvista"
      }
      onBack={handleBack}
    >
      <div className={`booking-wash-content ${currentStep === "confirm" ? 'single-column' : ''}`}>
        <div className="booking-category-side">
          {currentStep === "category" && (
            <Categorybar onSelectCategory={handleCategorySelect} />
          )}
          {currentStep === "service" && (
            <ServiceBar selectedCategory={selectedCategory!} onServiceSelect={handleServiceSelect} />
          )}
          {currentStep === "calendar" && (
            <Calendar
              onDateTimeSelected={handleDateTimeSelected}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              setSelectedDate={setSelectedDate}       // pass setters here
              setSelectedTime={setSelectedTime}
            />
          )}
          {currentStep === "contact" && (
            <ContactForm onSubmit={handleContactSubmit} prefill={contactInfo} />
          )}
          {currentStep === "confirm" && (
            <LastFrame
              selectedServices={selectedServices}
              selectedDate={selectedDate!}
              selectedTime={selectedTime!}
              contact={contactInfo}
              onConfirm={handleFinalConfirm}
            />
          )}
        </div>
        {currentStep !== "confirm" && <div className="booking-separator"></div>}
        {currentStep !== "confirm" && (
          <div className="booking-receipt-side">
            <BookingReceipt
              selectedServices={selectedServices}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
            />
          </div>
        )}
      </div>
    </BookingFrame>
  );
};

export default BookingWash;
