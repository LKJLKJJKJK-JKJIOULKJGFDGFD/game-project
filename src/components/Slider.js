import React from 'react';

const Slider = ({ position }) => {
  const sliderStyle = {
    position: 'absolute',
    left: `${position}px`,
    bottom: '20px',
    width: '100px',
    height: '10px',
    backgroundColor: 'blue',
    zIndex: 100
  };

  return <div style={sliderStyle} />;
};

export default Slider;