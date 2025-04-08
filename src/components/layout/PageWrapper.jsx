// src/components/layout/PageWrapper.jsx
import React, { useContext } from 'react';
import { SidebarContext } from '../../context/SidebarContext';
import '../../styles/PageWrapper.css';

const PageWrapper = ({ children, className }) => {
  const { isOpen } = useContext(SidebarContext);

  return (
    <div className={`page-wrapper ${isOpen ? 'sidebar-open' : 'sidebar-closed'} ${className || ''}`}>
      <div className="page-content">
        {children}
      </div>
    </div>
  );
};

export default PageWrapper;