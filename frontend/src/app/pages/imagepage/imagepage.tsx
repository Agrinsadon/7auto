'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import './imagepage.css';

const images = [
  { default: '/carfix.png', hover: '/carwash.png' },
  { default: '/carfix.png', hover: '/carwash.png' },
  { default: '/carfix.png', hover: '/carwash.png' },
  { default: '/carfix.png', hover: '/carwash.png' },
];

const ImagePage = () => {
  const [showHover, setShowHover] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 760);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const toggleHover = setInterval(() => {
      setShowHover(prev => !prev);
    }, 5000);

    return () => clearInterval(toggleHover);
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
      setShowHover(false);

      setTimeout(() => {
        setShowHover(true);
      }, 2500);
    }, 5000);

    return () => clearInterval(interval);
  }, [isMobile]);

  return (
    <div className='imagepage-container'>
      {isMobile ? (
        <div className='imageSlot'>
          <Image
            src={images[currentIndex].default}
            alt={`Image ${currentIndex + 1}`}
            fill
            sizes="100%"
            className='image defaultImage'
            style={{ opacity: showHover ? 0 : 1 }}
          />
          <Image
            src={images[currentIndex].hover}
            alt={`Image ${currentIndex + 1} Hover`}
            fill
            sizes="100%"
            className='image hoverImage'
            style={{ opacity: showHover ? 1 : 0 }}
          />
        </div>
      ) : (
        images.map((img, i) => (
          <div className='imageSlot' key={`slot-${i}-${img.default}`}>
            <Image
              src={img.default}
              alt={`Image ${i + 1}`}
              fill
              sizes="100%"
              priority={i === 0}
              className='image defaultImage'
              style={{ opacity: showHover ? 0 : 1 }}
            />
            <Image
              src={img.hover}
              alt={`Image ${i + 1} Hover`}
              fill
              sizes="100%"
              className='image hoverImage'
              style={{ opacity: showHover ? 1 : 0 }}
            />
          </div>
        ))
      )}

      {isMobile && (
        <div className='dots-container'>
          {images.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === currentIndex ? 'active' : ''}`}
              onClick={() => {
                setCurrentIndex(i);
                setShowHover(false);
                setTimeout(() => setShowHover(true), 2500);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImagePage;
