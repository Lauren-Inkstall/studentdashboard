import React from 'react';
import '../../styles/CustomSelect.css';

const CustomSelect = ({ 
  options, 
  value, 
  onChange, 
  className = '', 
  placeholder = 'Select an option',
  ...props 
}) => {
  return (
    <div className={`custom-select-container ${className}`}>
      <select 
        className="custom-select-element" 
        value={value} 
        onChange={onChange}
        {...props}
      >
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
