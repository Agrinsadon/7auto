'use client';

import Image from 'next/image';
import './imagepage.css';

const images = [
  { default: '/isam.png', hover: '/isom.png' },
  { default: '/isam.png', hover: '/isom.png' },
  { default: '/isam.png', hover: '/isom.png' },
  { default: '/isam.png', hover: '/isom.png' },
];

const ImageGrid = () => {
  return (
    <div className='container'>
      {images.map((img, i) => (
        <div className='imageSlot' key={`slot-${i}-${img.default}`}>
          <Image
            src={img.default}
            alt={`Image ${i + 1}`}
            fill
            sizes="100%"
            priority={i === 0}
            className='image defaultImage'
          />
          <Image
            src={img.hover}
            alt={`Image ${i + 1} Hover`}
            fill
            sizes="100%"
            className='image hoverImage'
          />
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
