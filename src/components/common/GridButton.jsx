import React from 'react';
import '../../styles/GridButton.css';

const GridButton = ({ 
  children, 
  color = 'green', // default color is green
  size = 'medium', // default size is medium
  className = '',
  compact = false,
  ...props 
}) => {
  const buttonClasses = [
    'grid-button',
    color !== 'green' ? color : '',
    size !== 'medium' ? size : '',
    compact ? 'compact' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default GridButton;
