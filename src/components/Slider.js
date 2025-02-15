import React, { useState, useEffect } from 'react';
import soccerBoot from '../images/soccerboot.jpg';
import './Slider.css';

const Slider = ({ position }) => {
  const [isMovingRight, setIsMovingRight] = useState(true);
  const [lastPosition, setLastPosition] = useState(position);

  useEffect(() => {
    setIsMovingRight(position > lastPosition);
    setLastPosition(position);
  }, [position]);

  const sliderStyle = {
    position: 'absolute',
    left: `${position}px`,
    bottom: '10px',
    width: '100px',  // adjust size as needed
    height: '50px',  // adjust size as needed
    backgroundImage: `url(${soccerBoot})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  };

  return (
    <div 
      style={sliderStyle} 
      className={`slider ${!isMovingRight ? 'slider-flipped' : ''}`}
    />
  );
};

export default Slider;