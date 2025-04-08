import React from 'react';
import '../../styles/SpaceBackground.css';

const SpaceBackground = ({ children }) => {
  return (
    <div className="space-background">
      <div className="stars"></div>
      <div className="planets">
        <div className="planet planet-1"></div>
        <div className="planet planet-2"></div>
        <div className="star star-1"></div>
        <div className="star star-2"></div>
        <div className="star star-3"></div>
        <div className="star star-4"></div>
      </div>
      <div className="wave-container">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
      </div>
      <div className="content-container">
        {children}
      </div>
    </div>
  );
};

export default SpaceBackground;