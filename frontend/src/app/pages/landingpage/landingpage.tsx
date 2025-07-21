"use client";
import React from 'react';
import './landingpage.css';
import BookButton from '../../component/buttons/bookbutton'; // Adjust path if necessary

const LandingPage = () => {
  return (
    <div className="image-frame">
      <img
        src="/carimage.png"
        alt="Landing"
        className="image-size"
      />
      <div className="button-overlay">
        <BookButton
          onClick={() => console.log("Varaa huolto clicked")}
          onText="Varaa huolto"
          variant='light-stay'
          size='large'

        />
        <BookButton
          onClick={() => console.log("Varaa pesu clicked")}
          onText="Varaa pesu"
          variant='dark-stay'
          size='large'
        />
      </div>
    </div>
  );
};

export default LandingPage;
