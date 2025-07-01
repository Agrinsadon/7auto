"use client";
import { useState } from "react";
import "./bookbutton.css";
import BookingFrame from "../bookframe/bookingframe";

const BookButton = () => {
    const [showFrame, setShowFrame] = useState(false);

    const handleClick = () => {
        setShowFrame(true); // show the booking frame
    };

    return (
        <div className="book-button-container">
            <button className="book-button" onClick={handleClick}>
                <span className="button-text">Varaa aika</span>
            </button>

            {showFrame && <BookingFrame />}
        </div>
    );
};

export default BookButton;
