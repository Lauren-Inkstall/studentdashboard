import React from 'react';
import '../../styles/DashboardCard.css';

const DashboardCard = ({ title, children, color }) => {
  return (
    <div className={`dashboard-card ${color}`}>
      <div className="dashboard-card-content">
        <h2 className="dashboard-card-title">{title}</h2>
        <div className="dashboard-card-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
