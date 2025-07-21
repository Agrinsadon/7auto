import { useState } from "react";
import Categorybar from "../bars/categoryBar";
import BookingReceipt from "../receipt/bookingreceipt";
import BookingFrame from "./bookingframe";
import ServiceBar from "../bars/serviceBar";
import Calendar from "../calendar/calendar";
import ContactForm from "../contact/contactform";
import LastFrame from "./lastframe";
import SuccessCheckmark from "./completeframe";
import "./bookingwash.css";

interface Service {
  name: string;
  description: string;
  price: string;
  category: string;
}

interface BookingWashProps {
  goBack: () => void;
  onClose: () => void;
}

type Step = "category" | "service" | "calendar" | "contact" | "confirm";

const BookingWash = ({ goBack, onClose }: BookingWashProps) => {
  const [currentStep, setCurrentStep] = useState<Step>("category");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [contactInfo, setContactInfo] = useState<any>(null);
  const [activeService, setActiveService] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentStep(category ? "service" : "category");
    setSelectedServices([]);
    setActiveService(null);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleServiceSelect = (service: Service) => {
    const isAlreadySelected = activeService === service.name;

    if (isAlreadySelected) {
      setSelectedServices([]);
      setActiveService(null);
      setSelectedDate(null);
      setSelectedTime(null);
    } else {
      setSelectedServices([service]);
      setActiveService(service.name);
      setSelectedDate(null);
      setSelectedTime(null);
      setCurrentStep("calendar");
    }
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

  const handleFinalConfirm = async () => {
    const bookingPayload = {
      services: selectedServices,
      date: selectedDate?.toISOString().split('T')[0],
      time: selectedTime,
      contact: contactInfo,
    };

    try {
      const response = await fetch('http://localhost:4000/api/book/wash', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingPayload),
      });

      if (response.ok) {
        setIsConfirmed(true);
      } else {
        alert('Jokin meni pieleen varauksen kanssa. Yritä uudelleen.');
      }
    } catch (error) {
      console.error('Error sending booking:', error);
      alert('Virhe varauksen lähetyksessä.');
    }
  };

  const handleBack = () => {
    if (isConfirmed) return;
    if (currentStep === "contact") setCurrentStep("calendar");
    else if (currentStep === "calendar") setCurrentStep("service");
    else if (currentStep === "service") setCurrentStep("category");
    else goBack();
  };

  const getStepText = () => {
    if (isConfirmed) return "Kiitos, nähdään pian";
    switch (currentStep) {
      case "category": return "Valitse Kategoria";
      case "service": return "Valitse Palvelu";
      case "calendar": return "Valitse Päivä & Aika";
      case "contact": return "Täytä Yhteystiedot";
      case "confirm": return "Tarkista ja vahvista";
      default: return "";
    }
  };

  return (
    <BookingFrame
      onText={getStepText()}
      onBack={handleBack}             // ✅ AINA annetaan
      onClose={onClose}
      disableBack={isConfirmed}       // ✅ Estetään käytettävyys tyylillä
    >
      <div className={`booking-wash-content ${currentStep === "confirm" ? "single-column" : ""}`}>
        <div className="booking-category-side">
          {currentStep === "category" && (
            <Categorybar
              onSelectCategory={handleCategorySelect}
              selectedCategory={selectedCategory}
            />
          )}

          {currentStep === "service" && selectedCategory && (
            <ServiceBar
              selectedCategory={selectedCategory}
              onServiceSelect={handleServiceSelect}
              activeService={activeService}
            />
          )}

          {currentStep === "calendar" && (
            <Calendar
              onDateTimeSelected={handleDateTimeSelected}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              setSelectedDate={setSelectedDate}
              setSelectedTime={setSelectedTime}
              bookingType="wash"
            />
          )}

          {currentStep === "contact" && (
            <ContactForm onSubmit={handleContactSubmit} prefill={contactInfo} />
          )}
        </div>

        {currentStep === "confirm" && selectedDate && selectedTime && contactInfo && (
          isConfirmed ? (
            <SuccessCheckmark />
          ) : (
            <LastFrame
              selectedServices={selectedServices}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              contact={contactInfo}
              onConfirm={handleFinalConfirm}
            />
          )
        )}

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
