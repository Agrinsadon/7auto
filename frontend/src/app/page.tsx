"use client";
import React, { useState } from "react";
import BookButton from "./component/buttons/bookbutton";
import BookingFrame from "./component/bookframe/bookingframe";

export default function Home() {
    const [showFrame, setShowFrame] = useState(false);

    const handleClick = () => {
        setShowFrame(true);
    };

    return (
        <div>
            <BookButton onClick={handleClick} onText="Varaa aika" />
            {showFrame && <BookingFrame />}
        </div>
    );
}
