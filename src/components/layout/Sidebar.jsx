import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaBook, FaChartBar, FaCalendarAlt, FaCog, FaGraduationCap, FaChartLine, FaBell, FaUser, FaCaretDown, FaTasks } from 'react-icons/fa';
import '../../styles/Sidebar.css';
import { SidebarContext } from '../../context/SidebarContext';

const Sidebar = () => {
  const { isOpen } = useContext(SidebarContext);
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };
  
  return (
    <div className={`app-sidebar ${isOpen ? 'open' : 'closed'}`}>
      <aside className="app-sidebar">
        <div className="sidebar-header">
          <h1 className="app-title">Paper Tracker</h1>
        </div>
        
        <nav className="sidebar-nav">
          <ul className="nav-list">
            <li className={`nav-item ${isActive('/') ? 'active' : ''}`}>
              <Link to="/" className="nav-link">
                <FaHome className="nav-icon" />
                <span className="nav-text">Dashboard</span>
              </Link>
            </li>
            <li className={`nav-item ${isActive('/paper-log') ? 'active' : ''}`}>
              <Link to="/paper-log" className="nav-link">
                <FaBook className="nav-icon" />
                <span className="nav-text">Paper Log</span>
              </Link>
            </li>
            <li className={`nav-item ${isActive('/analysis') ? 'active' : ''}`}>
              <Link to="/analysis" className="nav-link">
                <FaChartBar className="nav-icon" />
                <span className="nav-text">Analysis</span>
              </Link>
            </li>
            <li className={`nav-item ${isActive('/planning') ? 'active' : ''}`}>
              <Link to="/planning" className="nav-link">
                <FaCalendarAlt className="nav-icon" />
                <span className="nav-text">Planning</span>
              </Link>
            </li>
            <li className={`nav-item ${isActive('/assignments') ? 'active' : ''}`}>
              <Link to="/assignments" className="nav-link">
                <FaTasks className="nav-icon" />
                <span className="nav-text">Assignments</span>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <div className="nav-link dropdown-toggle" onClick={() => toggleDropdown(0)}>
                <FaGraduationCap className="nav-icon" />
                <span className="nav-text">Courses</span>
                <FaCaretDown className="dropdown-icon" style={{ transform: activeDropdown === 0 ? 'rotate(180deg)' : 'none' }} />
              </div>
              <ul className={`dropdown-menu ${activeDropdown === 0 ? 'active' : ''}`}>
                <li><Link to="/courses/all" className="dropdown-item">All Courses</Link></li>
                <li><Link to="/courses/active" className="dropdown-item">Active Courses</Link></li>
                <li><Link to="/courses/completed" className="dropdown-item">Completed</Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <div className="nav-link dropdown-toggle" onClick={() => toggleDropdown(1)}>
                <FaChartLine className="nav-icon" />
                <span className="nav-text">Progress</span>
                <FaCaretDown className="dropdown-icon" style={{ transform: activeDropdown === 1 ? 'rotate(180deg)' : 'none' }} />
              </div>
              <ul className={`dropdown-menu ${activeDropdown === 1 ? 'active' : ''}`}>
                <li><Link to="/progress/overview" className="dropdown-item">Overview</Link></li>
                <li><Link to="/progress/subjects" className="dropdown-item">By Subject</Link></li>
                <li><Link to="/progress/papers" className="dropdown-item">Past Papers</Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <div className="nav-link dropdown-toggle" onClick={() => toggleDropdown(2)}>
                <FaCalendarAlt className="nav-icon" />
                <span className="nav-text">Calendar</span>
                <FaCaretDown className="dropdown-icon" style={{ transform: activeDropdown === 2 ? 'rotate(180deg)' : 'none' }} />
              </div>
              <ul className={`dropdown-menu ${activeDropdown === 2 ? 'active' : ''}`}>
                <li><Link to="/calendar/month" className="dropdown-item">Monthly View</Link></li>
                <li><Link to="/calendar/week" className="dropdown-item">Weekly View</Link></li>
                <li><Link to="/calendar/exams" className="dropdown-item">Exam Schedule</Link></li>
              </ul>
            </li>
            <li className={`nav-item ${isActive('/messages') ? 'active' : ''}`}>
              <Link to="/messages" className="nav-link">
                <FaBook className="nav-icon" />
                <span className="nav-text">Messages</span>
              </Link>
            </li>
            <li className={`nav-item ${isActive('/notifications') ? 'active' : ''}`}>
              <Link to="/notifications" className="nav-link">
                <FaBell className="nav-icon" />
                <span className="nav-text">Notifications</span>
                <span className="badge">3</span>
              </Link>
            </li>
            <li className={`nav-item ${isActive('/profile') ? 'active' : ''}`}>
              <Link to="/profile" className="nav-link">
                <FaUser className="nav-icon" />
                <span className="nav-text">Profile</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <Link to="/settings" className="settings-link">
            <FaCog className="settings-icon" />
            <span className="settings-text">Settings</span>
          </Link>
        </div>
      </aside>
  </div>
  );
};

export default Sidebar;