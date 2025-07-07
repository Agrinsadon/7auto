"use client";
import React, { useState } from "react";
import BookButton from "./component/buttons/bookbutton";
import BookingStart from "./component/bookframes/bookingstart";

export default function Home() {
  const [showFrame, setShowFrame] = useState(false);

  const handleClick = () => {
    setShowFrame(true);
  };

  return (
    <div>
      <BookButton onClick={handleClick} onText="Varaa aika" />
      {showFrame && <BookingStart />}
    </div>
  );
}
