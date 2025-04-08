import React from 'react';
import '../../styles/GlowButton.css';

const GlowButton = ({ 
  children, 
  color = 'purple', // default color is purple
  size = 'medium', // default size is medium
  className = '',
  compact = false,
  icon = false,
  ...props 
}) => {
  const buttonClasses = [
    'glow-button',
    color !== 'purple' ? color : '',
    size !== 'medium' ? size : '',
    compact ? 'compact' : '',
    icon ? 'icon' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default GlowButton;
