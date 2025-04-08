import React, { useState, useEffect } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import { getOverallStats, getWeakestSubjects, getStrongestSubjects } from '../services/analysisService';
import { getPapers, getPlannedPapers } from '../services/storageService';
import SubjectComparison from '../components/dashboard/SubjectComparison';
import PaperStatusOverview from '../components/dashboard/PaperStatusOverview';
import DashboardCard from '../components/dashboard/DashboardCard';
import GridButton from '../components/common/GridButton';
import CyberCard from '../components/common/CyberCard';
import '../styles/Dashboard.css';
import Layout from '../components/layout/Layout';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPapers: 0,
    averageScore: 0,
    highestScore: 0,
    lowestScore: 0,
    totalSubjects: 0
  });
  // Used in the Subject Comparison section
  const [weakSubjects, setWeakSubjects] = useState([]);
  const [strongSubjects, setStrongSubjects] = useState([]);
  const [papers, setPapers] = useState([]);
  const [plannedPapers, setPlannedPapers] = useState([]);

  useEffect(() => {
    // Load data when component mounts
    loadData();
  }, []);

  const loadData = () => {
    // Get papers from local storage
    const paperData = getPapers();
    setPapers(paperData);

    // Get planned papers
    const plannedPaperData = getPlannedPapers();
    setPlannedPapers(plannedPaperData);

    // Calculate statistics
    if (paperData.length > 0) {
      setStats(getOverallStats());
      setWeakSubjects(getWeakestSubjects(3));
      setStrongSubjects(getStrongestSubjects(3));
    }
  };

  return (
    <Layout className="space-dashboard">
      {papers.length === 0 ? (
        <Alert variant="info" className="welcome-alert">
          Welcome to Student Dashboard! Start by adding your first past paper in the Paper Log section.
          <div className="mt-3">
            <GridButton color="blue">Add First Paper</GridButton>
          </div>
        </Alert>
      ) : (
        <>
          <div className="dashboard-container">
            {/* First row - Quick Stats */}
            <Row className="g-4 mb-4">
              <Col xs={12} md={6} lg={3}>
                <DashboardCard title="Today's Classes" color="blue">
                  <div className="dashboard-card-content-wrapper">
                    <div className="icon-container">
                      <div className="class-icon"></div>
                    </div>
                    <div className="text-content">
                      <h3>3 Classes</h3>
                      <p>Next: Mathematics at 10:00 AM</p>
                    </div>
                  </div>
                </DashboardCard>
              </Col>
              
              <Col xs={12} md={6} lg={3}>
                <DashboardCard title="Attendance" color="green">
                  <div className="progress-circle-container">
                    <svg className="progress-circle" viewBox="0 0 36 36">
                      <path
                        className="progress-circle-bg"
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="progress-circle-value"
                        strokeDasharray={`${92}, 100`}
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <text x="18" y="18" className="progress-text">
                        92%
                      </text>
                    </svg>
                  </div>
                </DashboardCard>
              </Col>
              
              <Col xs={12} md={6} lg={3}>
                <DashboardCard title="Latest Test" color="orange">
                  <div className="dashboard-card-content-wrapper">
                    <div className="text-content">
                      <h3>Biology</h3>
                      <p>Score: 85% (Grade A)</p>
                      <p>Date: 2025-04-01</p>
                    </div>
                  </div>
                </DashboardCard>
              </Col>
              
              <Col xs={12} md={6} lg={3}>
                <DashboardCard title="Total Papers" color="purple">
                  <div className="dashboard-card-content-wrapper">
                    <div className="text-content">
                      <h3>{stats.totalPapers || 20}</h3>
                      <p>Past papers available</p>
                    </div>
                  </div>
                </DashboardCard>
              </Col>
            </Row>

            {/* Second row - Performance Overview */}
            <Row className="g-4 mb-4">
              <Col xs={12} md={6}>
                <DashboardCard title="Performance Overview" color="blue">
                  <div className="dashboard-card-content-wrapper">
                    <div className="text-content">
                      <h3>Average Score: {stats.averageScore.toFixed(1)}%</h3>
                      <p>Based on {papers.length} completed papers</p>
                    </div>
                  </div>
                </DashboardCard>
              </Col>
              
              <Col xs={12} md={6}>
                <DashboardCard title="Paper Completion" color="white">
                  <SubjectComparison papers={papers} weakSubjects={weakSubjects} />
                </DashboardCard>
              </Col>
            </Row>
            
            {/* Third row - Subjects and Upcoming Papers */}
            <Row className="g-4 mb-4">
              <Col xs={12} lg={8}>
                <Row className="g-4 mb-4">
                  <Col xs={12} md={6} lg={4}>
                    <DashboardCard title="Recent Papers" color="purple">
                      <div className="dashboard-card-content-wrapper">
                        <div className="text-content">
                          <div className="paper-item">
                            <div className="paper-info">
                              <span className="paper-name">Physics Paper 2</span>
                              <span className="paper-date">May 2023</span>
                            </div>
                            <div className="paper-score">78%</div>
                          </div>
                          <div className="paper-item">
                            <div className="paper-info">
                              <span className="paper-name">Chemistry Paper 4</span>
                              <span className="paper-date">June 2023</span>
                            </div>
                            <div className="paper-score">85%</div>
                          </div>
                          <div className="paper-item">
                            <div className="paper-info">
                              <span className="paper-name">Mathematics Paper 1</span>
                              <span className="paper-date">June 2023</span>
                            </div>
                            <div className="paper-score">92%</div>
                          </div>
                        </div>
                      </div>
                    </DashboardCard>
                  </Col>
                  
                  <Col xs={12} md={6}>
                    <DashboardCard title="Strongest Subjects" color="white">
                      <ul className="space-list">
                        {strongSubjects.length > 0 ? (
                          strongSubjects.map((subject, index) => (
                            <li key={index} className="space-list-item">
                              <span>{subject.name}</span>
                              <span className="space-badge success">{subject.score}%</span>
                            </li>
                          ))
                        ) : (
                          <>
                            <li className="space-list-item">
                              <span>Mathematics</span>
                              <span className="space-badge success">94%</span>
                            </li>
                            <li className="space-list-item">
                              <span>Computer Science</span>
                              <span className="space-badge success">92%</span>
                            </li>
                            <li className="space-list-item">
                              <span>Biology</span>
                              <span className="space-badge success">88%</span>
                            </li>
                          </>
                        )}
                      </ul>
                    </DashboardCard>
                  </Col>
                </Row>
              </Col>
              
              <Col xs={12} lg={4}>
                <DashboardCard title="Exam Resources" color="white">
                  <div className="exam-selector">
                    <div className="exam-buttons">
                      <button className="exam-button active">IGCSE</button>
                      <button className="exam-button">A-Level</button>
                      <button className="exam-button">IB</button>
                    </div>
                    <div className="year-selector">
                      <div className="year-label">Year:</div>
                      <div className="year-value">2025</div>
                    </div>
                    <div className="availability">
                      <span>12 Papers Available</span>
                    </div>
                  </div>
                </DashboardCard>
              </Col>
            </Row>

            {/* Fourth row - Upcoming Papers */}
            <Row className="g-4 mb-4">
              <Col xs={12}>
                <DashboardCard title="Upcoming Papers" color="white">
                  <div className="table-responsive">
                    <table className="papers-table">
                      <thead>
                        <tr>
                          <th>Subject</th>
                          <th>Session</th>
                          <th>Date</th>
                          <th>Priority</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {plannedPapers.length > 0 ? (
                          plannedPapers.slice(0, 3).map((paper, index) => (
                            <tr key={index}>
                              <td>{paper.subject}</td>
                              <td>{paper.session}</td>
                              <td>{paper.date || 'N/A'}</td>
                              <td>
                                <span className={`status-badge ${paper.priority.toLowerCase()}`}>
                                  {paper.priority}
                                </span>
                              </td>
                              <td>
                                <GridButton color="purple" size="small" compact>View</GridButton>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <>
                            <tr>
                              <td>English First Language</td>
                              <td>May/June</td>
                              <td>2025-05-15</td>
                              <td><span className="status-badge planned">Planned</span></td>
                              <td>
                                <GridButton color="blue" size="small" compact>View</GridButton>
                              </td>
                            </tr>
                            <tr>
                              <td>Chemistry</td>
                              <td>May/June</td>
                              <td>2025-04-10</td>
                              <td><span className="status-badge high">High</span></td>
                              <td>
                                <GridButton color="orange" size="small" compact>View</GridButton>
                              </td>
                            </tr>
                            <tr>
                              <td>Biology</td>
                              <td>May/June</td>
                              <td>2025-04-21</td>
                              <td><span className="status-badge medium">Medium</span></td>
                              <td>
                                <GridButton color="cyan" size="small" compact>View</GridButton>
                              </td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                </DashboardCard>
              </Col>
            </Row>

            {/* Fifth row - Paper Status Overview */}
            <Row className="g-4 mb-4">
              <Col xs={12}>
                <PaperStatusOverview />
              </Col>
            </Row>

            {/* Sixth row - Cyber Cards */}
            <Row className="g-4 mb-4">
              <Col xs={12}>
                <DashboardCard title="Quick Access" color="white">
                  <div className="d-flex flex-wrap justify-content-center gap-4 py-3">
                    <CyberCard 
                      title="PAST\nPAPERS" 
                      subtitle="VIEW ALL" 
                      highlightText="PAPERS" 
                      color="blue" 
                      size="small"
                      onClick={() => window.location.href = '/papers'}
                    />
                    <CyberCard 
                      title="ASSIGNMENTS" 
                      subtitle="MANAGE" 
                      highlightText="TASKS" 
                      color="green" 
                      size="small"
                      onClick={() => window.location.href = '/assignments'}
                    />
                    <CyberCard 
                      title="ANALYSIS" 
                      subtitle="TRACK" 
                      highlightText="PROGRESS" 
                      color="purple" 
                      size="small"
                      onClick={() => window.location.href = '/analysis'}
                    />
                    <CyberCard 
                      title="RESOURCES" 
                      subtitle="STUDY" 
                      highlightText="MATERIALS" 
                      color="orange" 
                      size="small"
                      onClick={() => console.log('Resources clicked')}
                    />
                  </div>
                </DashboardCard>
              </Col>
            </Row>
          </div>
        </>
      )}
      <div className="footer-text">
        Past Paper Tracker © 2025 | Space-themed Student Dashboard
        <div className="mt-3 text-center">
          <GridButton color="blue" size="small" className="mx-2">Help</GridButton>
          <GridButton color="green" size="small" className="mx-2">Feedback</GridButton>
          <GridButton color="purple" size="small" className="mx-2">Settings</GridButton>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;