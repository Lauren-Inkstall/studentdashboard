import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { FaClipboardCheck, FaChartLine, FaTrophy, FaExclamationTriangle, FaBookOpen } from 'react-icons/fa';

const StatsSummary = ({ stats }) => {
  const { totalPapers, averageScore, highestScore, lowestScore, totalSubjects } = stats;
  
  const statCards = [
    {
      title: 'Total Papers',
      value: totalPapers,
      icon: <FaClipboardCheck className="text-primary" size={28} />,
      color: 'primary'
    },
    {
      title: 'Average Score',
      value: `${averageScore.toFixed(1)}%`,
      icon: <FaChartLine className="text-success" size={28} />,
      color: 'success'
    },
    {
      title: 'Highest Score',
      value: `${highestScore.toFixed(1)}%`,
      icon: <FaTrophy className="text-warning" size={28} />,
      color: 'warning'
    },
    {
      title: 'Lowest Score',
      value: `${lowestScore.toFixed(1)}%`,
      icon: <FaExclamationTriangle className="text-danger" size={28} />,
      color: 'danger'
    },
    {
      title: 'Total Subjects',
      value: totalSubjects,
      icon: <FaBookOpen className="text-info" size={28} />,
      color: 'info'
    }
  ];
  
  return (
    <Row>
      {statCards.map((card, index) => (
        <Col key={index} md={6} lg={true} className="mb-3">
          <Card className={`border-${card.color} h-100`}>
            <Card.Body className="d-flex align-items-center">
              <div className="me-3">
                {card.icon}
              </div>
              <div>
                <h6 className="text-muted mb-1">{card.title}</h6>
                <h3 className="mb-0">{card.value}</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default StatsSummary;
