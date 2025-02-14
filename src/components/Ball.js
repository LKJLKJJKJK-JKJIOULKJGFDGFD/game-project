import React from 'react';

const Ball = ({ position, color }) => {
  const ballStyle = {
    position: 'absolute',
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: '20px',
    height: '20px',
    backgroundColor: color || 'red',
    borderRadius: '50%',
  };

  return <div style={ballStyle} />;
};

export default Ball;