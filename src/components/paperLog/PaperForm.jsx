  import React, { useState, useEffect } from 'react';
  import { Form, Row, Col } from 'react-bootstrap';
  import { savePaper, updatePaper } from '../../services/storageService';
  import GridButton from '../common/GridButton';
  import { 
    getSubjectsByExamBoard, 
    getPapersBySubject, 
    examSessions, 
    examYears 
  } from '../../services/examBoardData';

  const PaperForm = ({ paper, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
      examBoard: '',
      subjectCode: '',
      subject: '',
      paperCode: '',
      paperName: '',
      yearSession: '',
      paperType: '',
      timeTaken: '',
      mark: '',
      maxMark: '',
      grade: '',
      difficulty: 'Moderate',
      comments: ''
    });
    
    const [validated, setValidated] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const [papers, setPapers] = useState([]);
    const [sessions] = useState(examSessions);
    const [years] = useState(examYears);
    
    useEffect(() => {
      // If editing an existing paper, populate the form
      if (paper) {
        setFormData({
          ...paper
        });
        
        // Load subjects for the selected exam board
        if (paper.examBoard) {
          const boardSubjects = getSubjectsByExamBoard(paper.examBoard);
          setSubjects(boardSubjects);
        }
        
        // Load papers for the selected subject
        if (paper.examBoard && paper.subjectCode) {
          const subjectPapers = getPapersBySubject(paper.examBoard, paper.subjectCode);
          setPapers(subjectPapers);
        }
      }
    }, [paper]);
    
    // Load subjects when exam board changes
    useEffect(() => {
      if (formData.examBoard) {
        const boardSubjects = getSubjectsByExamBoard(formData.examBoard);
        setSubjects(boardSubjects);
        
        // Reset subject and paper selection
        if (!paper) {
          setFormData(prev => ({
            ...prev,
            subjectCode: '',
            subject: '',
            paperCode: '',
            paperName: '',
            paperType: ''
          }));
        }
      }
    }, [formData.examBoard, paper]);
    
    // Load papers when subject changes
    useEffect(() => {
      if (formData.examBoard && formData.subjectCode) {
        const subjectPapers = getPapersBySubject(formData.examBoard, formData.subjectCode);
        setPapers(subjectPapers);
        
        // Set subject name
        const selectedSubject = subjects.find(s => s.code === formData.subjectCode);
        if (selectedSubject) {
          setFormData(prev => ({
            ...prev,
            subject: selectedSubject.name
          }));
        }
        
        // Reset paper selection
        if (!paper) {
          setFormData(prev => ({
            ...prev,
            paperCode: '',
            paperName: '',
            paperType: ''
          }));
        }
      }
    }, [formData.examBoard, formData.subjectCode, subjects, paper]);
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
      
      // Special handling for paper selection
      if (name === 'paperCode' && value) {
        const paperCode = value.split('/')[1];
        const selectedPaper = papers.find(p => p.code === paperCode);
        
        if (selectedPaper) {
          setFormData(prev => ({
            ...prev,
            paperCode: value,
            paperName: selectedPaper.name,
            paperType: selectedPaper.type
          }));
        }
      }
      
      // Special handling for year/session selection
      if (name === 'year' || name === 'session') {
        const year = name === 'year' ? value : formData.year;
        const session = name === 'session' ? value : formData.session;
        
        if (year && session) {
          setFormData(prev => ({
            ...prev,
            yearSession: `${session} ${year}`
          }));
        }
      }
    };
    
    const calculateGrade = () => {
      const percentage = (formData.mark / formData.maxMark) * 100;
      
      // Simple grade calculation - can be customized based on specific grading schemes
      let grade = '';
      if (percentage >= 90) grade = 'A*';
      else if (percentage >= 80) grade = 'A';
      else if (percentage >= 70) grade = 'B';
      else if (percentage >= 60) grade = 'C';
      else if (percentage >= 50) grade = 'D';
      else if (percentage >= 40) grade = 'E';
      else grade = 'U';
      
      setFormData({
        ...formData,
        grade
      });
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.stopPropagation();
        setValidated(true);
        return;
      }
      
      if (paper) {
        // Update existing paper
        updatePaper({
          ...formData,
          id: paper.id,
          timestamp: paper.timestamp
        });
        onSuccess('update');
      } else {
        // Add new paper
        savePaper({
          ...formData,
          timestamp: new Date().toISOString()
        });
        onSuccess('add');
      }
    };
    
    return (
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="examBoard">
            <Form.Label>Exam Board & Level</Form.Label>
            <Form.Select
              name="examBoard"
              value={formData.examBoard}
              onChange={handleChange}
              required
            >
              <option value="">Select Exam Board</option>
              <option value="IGCSE">IGCSE</option>
              <option value="IBDP">IBDP</option>
              <option value="AS Level">AS Level</option>
              <option value="A Level">A Level</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select an exam board.
            </Form.Control.Feedback>
          </Form.Group>
          
          <Form.Group as={Col} md="4" controlId="subjectCode">
            <Form.Label>Subject</Form.Label>
            <Form.Select
              name="subjectCode"
              value={formData.subjectCode}
              onChange={handleChange}
              required
              disabled={!formData.examBoard}
            >
              <option value="">Select Subject</option>
              {subjects.map((subject) => (
                <option key={subject.code} value={subject.code}>
                  {subject.code} - {subject.name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a subject.
            </Form.Control.Feedback>
          </Form.Group>
          
          <Form.Group as={Col} md="4" controlId="paperCode">
            <Form.Label>Paper</Form.Label>
            <Form.Select
              name="paperCode"
              value={formData.paperCode}
              onChange={handleChange}
              required
              disabled={!formData.subjectCode}
            >
              <option value="">Select Paper</option>
              {papers.map((paper) => (
                <option key={paper.code} value={`${formData.subjectCode}/${paper.code}`}>
                  {paper.code} - {paper.name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a paper.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        
        <Row className="mb-3">
          <Form.Group as={Col} md="3" controlId="session">
            <Form.Label>Session</Form.Label>
            <Form.Select
              name="session"
              value={formData.yearSession ? formData.yearSession.split(' ')[0] : ''}
              onChange={handleChange}
              required
            >
              <option value="">Select Session</option>
              {sessions.map((session) => (
                <option key={session} value={session}>
                  {session}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a session.
            </Form.Control.Feedback>
          </Form.Group>
          
          <Form.Group as={Col} md="3" controlId="year">
            <Form.Label>Year</Form.Label>
            <Form.Select
              name="year"
              value={formData.yearSession ? formData.yearSession.split(' ')[1] : ''}
              onChange={handleChange}
              required
            >
              <option value="">Select Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a year.
            </Form.Control.Feedback>
          </Form.Group>
          
          <Form.Group as={Col} md="6" controlId="paperType">
            <Form.Label>Paper Type</Form.Label>
            <Form.Control
              type="text"
              value={formData.paperType}
              readOnly
              placeholder="Auto-filled based on paper selection"
            />
            <Form.Text className="text-muted">
              Paper type is determined by the selected paper.
            </Form.Text>
          </Form.Group>
          
          <Form.Group as={Col} md="4" controlId="timeTaken">
            <Form.Label>Time Taken (minutes)</Form.Label>
            <Form.Control
              type="number"
              name="timeTaken"
              value={formData.timeTaken}
              onChange={handleChange}
              placeholder="e.g. 90"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide the time taken.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="mark">
            <Form.Label>Mark</Form.Label>
            <Form.Control
              type="number"
              name="mark"
              value={formData.mark}
              onChange={handleChange}
              onBlur={calculateGrade}
              placeholder="Your score"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide your mark.
            </Form.Control.Feedback>
          </Form.Group>
          
          <Form.Group as={Col} md="4" controlId="maxMark">
            <Form.Label>Maximum Mark</Form.Label>
            <Form.Control
              type="number"
              name="maxMark"
              value={formData.maxMark}
              onChange={handleChange}
              onBlur={calculateGrade}
              placeholder="Total possible marks"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide the maximum mark.
            </Form.Control.Feedback>
          </Form.Group>
          
          <Form.Group as={Col} md="4" controlId="grade">
            <Form.Label>Grade</Form.Label>
            <Form.Control
              type="text"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              placeholder="Auto-calculated"
              readOnly
            />
            <Form.Text className="text-muted">
              Automatically calculated based on mark.
            </Form.Text>
          </Form.Group>
        </Row>
        
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="difficulty">
            <Form.Label>Difficulty Level</Form.Label>
            <Form.Select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              required
            >
              <option value="Easy">Easy</option>
              <option value="Moderate">Moderate</option>
              <option value="Hard">Hard</option>
            </Form.Select>
          </Form.Group>
          
          <Form.Group as={Col} md="8" controlId="comments">
            <Form.Label>Comments & Feedback</Form.Label>
            <Form.Control
              as="textarea"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              placeholder="Notes on mistakes, tricky questions, areas for revision..."
              rows={3}
            />
          </Form.Group>
        </Row>
        
        <div className="d-flex justify-content-end">
          <GridButton color="red" onClick={onClose} className="me-2">
            Cancel
          </GridButton>
          <GridButton color="blue" type="submit">
            {paper ? 'Update Paper' : 'Add Paper'}
          </GridButton>
        </div>
      </Form>
    );
  };

  export default PaperForm;
