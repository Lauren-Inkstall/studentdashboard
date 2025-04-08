import React from 'react';
import '../../styles/CyberCard.css';

const CyberCard = ({ 
  title, 
  subtitle, 
  highlightText,
  color = 'blue', // blue, green, purple, orange, cyan
  size = 'medium', // small, medium, large
  onClick,
  className = ''
}) => {
  return (
    <div className={`cyber-card-container ${size} ${className}`} onClick={onClick}>
      <div className="canvas">
        <div className="tracker tr-1"></div>
        <div className="tracker tr-2"></div>
        <div className="tracker tr-3"></div>
        <div className="tracker tr-4"></div>
        <div className="tracker tr-5"></div>
        <div className="tracker tr-6"></div>
        <div className="tracker tr-7"></div>
        <div className="tracker tr-8"></div>
        <div className="tracker tr-9"></div>
        <div className={`cyber-card-element cyber-card ${color}`}>
          <div className="card-content">
            <div className="card-glare"></div>
            <div className="cyber-lines">
              <span></span><span></span><span></span><span></span>
            </div>
            <p className="cyber-prompt">HOVER ME</p>
            <div className="title">{title || 'CYBER\nCARD'}</div>
            <div className="glowing-elements">
              <div className="glow-1"></div>
              <div className="glow-2"></div>
              <div className="glow-3"></div>
            </div>
            <div className="subtitle">
              <span>{subtitle || 'INTERACTIVE'}</span>
              <span className="highlight">{highlightText || '3D EFFECT'}</span>
            </div>
            <div className="card-particles">
              <span></span><span></span><span></span>
              <span></span><span></span><span></span>
            </div>
            <div className="corner-elements">
              <span></span><span></span><span></span><span></span>
            </div>
            <div className="scan-line"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyberCard;
