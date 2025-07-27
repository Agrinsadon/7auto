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

  // Toggle default/hover every 5 seconds
  useEffect(() => {
    const toggleHover = setInterval(() => {
      setShowHover(prev => !prev);
    }, 5000);
    return () => clearInterval(toggleHover);
  }, []);

  // On mobile, also cycle through images every 5 seconds (sync with hover toggle)
  useEffect(() => {
    if (!isMobile) return;

    const cycleImages = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
      setShowHover(false); // reset to default image on each new image
    }, 5000);
    return () => clearInterval(cycleImages);
  }, [isMobile]);

  return (
    <div className='imagepage-container'>
      {isMobile
        ? (
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
        )
        : images.map((img, i) => (
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
      }

      {/* Dots below images - only show on mobile */}
      {isMobile && (
        <div className='dots-container'>
          {images.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === currentIndex ? 'active' : ''}`}
              onClick={() => {
                setCurrentIndex(i);
                setShowHover(false); // reset fade to default image when manually changed
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGrid;
