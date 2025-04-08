import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import { getPapers } from '../services/storageService';
import GridButton from '../components/common/GridButton';
import { 
  getPerformanceTrend, 
  getStatsByPaperType, 
  getStatsByDifficulty,
  getWeakestSubjects,
  getStrongestSubjects
} from '../services/analysisService';
import PerformanceTrendChart from '../components/analysis/PerformanceTrendChart';
import PaperTypeChart from '../components/analysis/PaperTypeChart';
import DifficultyChart from '../components/analysis/DifficultyChart';
import StrengthsWeaknesses from '../components/analysis/StrengthsWeaknesses';
import Layout from '../components/layout/Layout';

const Analysis = () => {
  const [papers, setPapers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [performanceData, setPerformanceData] = useState([]);
  const [paperTypeStats, setPaperTypeStats] = useState([]);
  const [difficultyStats, setDifficultyStats] = useState([]);
  const [weakSubjects, setWeakSubjects] = useState([]);
  const [strongSubjects, setStrongSubjects] = useState([]);

  useEffect(() => {
    // Load papers when component mounts
    loadData();
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  // Define updateCharts with useCallback to avoid recreation on each render
  const updateCharts = useCallback(() => {
    // Get performance trend data
    setPerformanceData(getPerformanceTrend(selectedSubject));
    
    // Get paper type statistics
    setPaperTypeStats(getStatsByPaperType());
    
    // Get difficulty statistics
    setDifficultyStats(getStatsByDifficulty());
    
    // Get weakest subjects
    setWeakSubjects(getWeakestSubjects(5));
    
    // Get strongest subjects
    setStrongSubjects(getStrongestSubjects(5));
  }, [selectedSubject]);

  useEffect(() => {
    // Update charts when selected subject changes or papers update
    updateCharts();
  }, [updateCharts, papers]);

  const loadData = () => {
    const paperData = getPapers();
    setPapers(paperData);
    
    // Extract unique subjects
    const uniqueSubjects = [...new Set(paperData.map(paper => paper.subject))];
    setSubjects(uniqueSubjects);
    
    // Set initial subject selection
    if (uniqueSubjects.length > 0 && !selectedSubject) {
      setSelectedSubject('');
    }
    
    // Update charts
    updateCharts();
  };



  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  return (
    <Layout>
      <h1 className="mb-4">Performance Analysis</h1>
      
      {papers.length === 0 ? (
        <Card className="mb-4">
          <Card.Body className="text-center">
            <p className="mb-0">No past papers added yet. Add some papers in the Paper Log section to see analysis.</p>
          </Card.Body>
        </Card>
      ) : (
        <>
          <Card className="mb-4">
            <Card.Body>
              <Form className="d-flex align-items-end">
                <Form.Group className="flex-grow-1 me-3">
                  <Form.Label>Filter by Subject</Form.Label>
                  <Form.Select 
                    value={selectedSubject} 
                    onChange={handleSubjectChange}
                  >
                    <option value="">All Subjects</option>
                    {subjects.map((subject, index) => (
                      <option key={index} value={subject}>{subject}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <GridButton color="blue" size="small" compact>
                  Apply Filter
                </GridButton>
              </Form>
            </Card.Body>
          </Card>
          
          <Row className="mb-4">
            <Col lg={12}>
              <Card>
                <Card.Header>Performance Trend Over Time</Card.Header>
                <Card.Body>
                  <PerformanceTrendChart data={performanceData} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          <Row className="mb-4">
            <Col md={6}>
              <Card className="h-100">
                <Card.Header>Performance by Paper Type</Card.Header>
                <Card.Body>
                  <PaperTypeChart data={paperTypeStats} />
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="h-100">
                <Card.Header>Performance by Difficulty Level</Card.Header>
                <Card.Body>
                  <DifficultyChart data={difficultyStats} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          <Row>
            <Col>
              <StrengthsWeaknesses 
                strengths={strongSubjects} 
                weaknesses={weakSubjects} 
              />
            </Col>
          </Row>
          
          <Row className="mt-4 mb-4">
            <Col className="d-flex justify-content-center gap-3">
              <GridButton color="green">
                Export Analysis
              </GridButton>
              <GridButton color="purple">
                Print Report
              </GridButton>
            </Col>
          </Row>
        </>
      )}
    </Layout>
  );
};

export default Analysis;
