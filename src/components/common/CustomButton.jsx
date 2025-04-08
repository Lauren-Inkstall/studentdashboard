import React from 'react';
import '../../styles/CustomButton.css';

const CustomButton = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  className = '',
  disabled = false,
  type = 'button',
  ...props 
}) => {
  const buttonClass = `custom-button ${variant} ${size} ${className} ${disabled ? 'disabled' : ''}`;
  
  return (
    <button 
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;
