'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import './imagepage.css';

const images = [
  { default: '/isam.png', hover: '/isom.png' },
  { default: '/isam.png', hover: '/isom.png' },
  { default: '/isam.png', hover: '/isom.png' },
  { default: '/isam.png', hover: '/isom.png' },
];

const ImageGrid = () => {
  const [showHover, setShowHover] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 760);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Hover toggle for DESKTOP only
  useEffect(() => {
    if (isMobile) return;

    const toggleHover = setInterval(() => {
      setShowHover(prev => !prev);
    }, 5000);

    return () => clearInterval(toggleHover);
  }, [isMobile]);

  // Sync image cycling + hover for MOBILE
  useEffect(() => {
    if (!isMobile) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
      setShowHover(false); // Reset to default image

      // Optional: Show hover image halfway through
      setTimeout(() => {
        setShowHover(true);
      }, 2500); // Half of 5 seconds
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

      {/* Dots navigation for mobile */}
      {isMobile && (
        <div className='dots-container'>
          {images.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === currentIndex ? 'active' : ''}`}
              onClick={() => {
                setCurrentIndex(i);
                setShowHover(false); // reset to default when manually selected
                setTimeout(() => setShowHover(true), 2500); // restart hover
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGrid;
