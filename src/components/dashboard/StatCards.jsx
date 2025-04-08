import React from 'react';
import { Row, Col } from 'react-bootstrap';
import '../../styles/StatCards.css';

const StatCards = () => {
  return (
    <Row className="mb-4">
      <Col md={4} className="mb-3 mb-md-0">
        <div className="stat-card">
          <div className="stat-card-header">Upcoming Classes</div>
          <div className="stat-card-body">
            <div className="stat-card-item">Today: 3 Classes</div>
            <div className="stat-card-item">Next: Math, 2 PM</div>
          </div>
        </div>
      </Col>
      
      <Col md={4} className="mb-3 mb-md-0">
        <div className="stat-card">
          <div className="stat-card-header">Attendance Rate</div>
          <div className="stat-card-body">
            <div className="stat-card-item">Overall: 90%</div>
            <div className="stat-card-item">This Month: 92%</div>
          </div>
        </div>
      </Col>
      
      <Col md={4}>
        <div className="stat-card">
          <div className="stat-card-header">Latest Test</div>
          <div className="stat-card-body">
            <div className="stat-card-item">Score: 85%</div>
            <div className="stat-card-item">Grade: A</div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default StatCards;
