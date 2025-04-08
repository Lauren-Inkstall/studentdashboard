import React from 'react';
import { Row, Col, Card, ProgressBar } from 'react-bootstrap';
import { FaThumbsUp, FaExclamationTriangle } from 'react-icons/fa';

const StrengthsWeaknesses = ({ strengths, weaknesses }) => {
  return (
    <Row>
      <Col md={6} className="mb-4 mb-md-0">
        <Card className="h-100">
          <Card.Header className="d-flex align-items-center">
            <FaThumbsUp className="text-success me-2" />
            <span>Strengths</span>
          </Card.Header>
          <Card.Body>
            {strengths.length > 0 ? (
              <div>
                {strengths.map((subject, index) => (
                  <div key={index} className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span>{subject.subject}</span>
                      <span className="text-success">{subject.average.toFixed(1)}%</span>
                    </div>
                    <ProgressBar 
                      variant="success" 
                      now={subject.average} 
                      min={0} 
                      max={100} 
                    />
                  </div>
                ))}
                <div className="mt-3 text-muted small">
                  <p>These are your strongest subjects based on average performance. Keep up the good work!</p>
                </div>
              </div>
            ) : (
              <p className="text-muted">No data available</p>
            )}
          </Card.Body>
        </Card>
      </Col>
      
      <Col md={6}>
        <Card className="h-100">
          <Card.Header className="d-flex align-items-center">
            <FaExclamationTriangle className="text-warning me-2" />
            <span>Areas for Improvement</span>
          </Card.Header>
          <Card.Body>
            {weaknesses.length > 0 ? (
              <div>
                {weaknesses.map((subject, index) => (
                  <div key={index} className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span>{subject.subject}</span>
                      <span className="text-warning">{subject.average.toFixed(1)}%</span>
                    </div>
                    <ProgressBar 
                      variant="warning" 
                      now={subject.average} 
                      min={0} 
                      max={100} 
                    />
                  </div>
                ))}
                <div className="mt-3 text-muted small">
                  <p>These subjects have the lowest average scores. Consider focusing more on these areas in your revision.</p>
                  <p>Recommended actions:</p>
                  <ul>
                    <li>Review past paper comments for these subjects</li>
                    <li>Allocate more study time to these areas</li>
                    <li>Consider seeking additional help or resources</li>
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-muted">No data available</p>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default StrengthsWeaknesses;
