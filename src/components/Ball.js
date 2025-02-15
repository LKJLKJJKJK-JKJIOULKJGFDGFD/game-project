import React from 'react';
import jasonFace from '../images/jasonface.jpg';
import './Ball.css';

const Ball = ({ position }) => {
  const ballStyle = {
    position: 'absolute',
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: '40px',  // adjust size as needed
    height: '40px', // adjust size as needed
    backgroundImage: `url(${jasonFace})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    borderRadius: '50%',  // makes it perfectly round
    animation: 'spin 4s linear infinite'  // continuous spinning
  };

  return <div style={ballStyle} className="spinning-ball" />;
};

export default Ball;