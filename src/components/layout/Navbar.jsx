import React, { useContext } from 'react';
import { SidebarContext } from '../../context/SidebarContext';
import { FaBell, FaSearch, FaUser, FaBars } from 'react-icons/fa';
import '../../styles/Navbar.css';

const AppNavbar = () => {
  const { toggleSidebar } = useContext(SidebarContext);
  return (
    <nav className="space-navbar">
      <div className="space-navbar-container">
      <button onClick={toggleSidebar} className="sidebar-toggle">
          <FaBars />
        </button>
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search papers, subjects..." className="search-input" />
        </div>
        
        <div className="navbar-actions">
          <div className="action-item">
            <FaBell className="action-icon" />
            <span className="notification-badge">3</span>
          </div>
          
          <div className="user-profile">
            <div className="user-info">
              <span className="user-name">Student Name</span>
              <span className="user-role">IGCSE Student</span>
            </div>
            <div className="profile-avatar">
              <FaUser className="avatar-icon" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;