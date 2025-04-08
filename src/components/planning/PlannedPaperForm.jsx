import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { savePlannedPaper, updatePlannedPaper } from '../../services/storageService';
import { 
  getSubjectsByExamBoard, 
  getPapersBySubject, 
  examSessions, 
  examYears 
} from '../../services/examBoardData';

const PlannedPaperForm = ({ plannedPaper, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    examBoard: '',
    subjectCode: '',
    subject: '',
    paperCode: '',
    paperName: '',
    yearSession: '',
    paperType: '',
    deadline: '',
    priority: 'Medium',
    notes: ''
  });
  
  const [validated, setValidated] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [papers, setPapers] = useState([]);
  const [sessions] = useState(examSessions);
  const [years] = useState(examYears);
  
  useEffect(() => {
    // If editing an existing planned paper, populate the form
    if (plannedPaper) {
      setFormData({
        ...plannedPaper
      });
      
      // Load subjects for the selected exam board
      if (plannedPaper.examBoard) {
        const boardSubjects = getSubjectsByExamBoard(plannedPaper.examBoard);
        setSubjects(boardSubjects);
      }
      
      // Load papers for the selected subject
      if (plannedPaper.examBoard && plannedPaper.subjectCode) {
        const subjectPapers = getPapersBySubject(plannedPaper.examBoard, plannedPaper.subjectCode);
        setPapers(subjectPapers);
      }
    }
  }, [plannedPaper]);
  
  // Load subjects when exam board changes
  useEffect(() => {
    if (formData.examBoard) {
      const boardSubjects = getSubjectsByExamBoard(formData.examBoard);
      setSubjects(boardSubjects);
      
      // Reset subject and paper selection
      if (!plannedPaper) {
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
  }, [formData.examBoard, plannedPaper]);
  
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
      if (!plannedPaper) {
        setFormData(prev => ({
          ...prev,
          paperCode: '',
          paperName: '',
          paperType: ''
        }));
      }
    }
  }, [formData.examBoard, formData.subjectCode, subjects, plannedPaper]);
  
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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    if (plannedPaper) {
      // Update existing planned paper
      updatePlannedPaper({
        ...formData,
        id: plannedPaper.id
      });
      onSuccess('update');
    } else {
      // Add new planned paper
      savePlannedPaper({
        ...formData
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
        
        <Form.Group as={Col} md="4" controlId="deadline">
          <Form.Label>Deadline</Form.Label>
          <Form.Control
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a deadline.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="priority">
          <Form.Label>Priority</Form.Label>
          <Form.Select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            required
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </Form.Select>
        </Form.Group>
        
        <Form.Group as={Col} md="8" controlId="notes">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as="textarea"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Additional notes, resources needed, etc."
            rows={3}
          />
        </Form.Group>
      </Row>
      
      <div className="d-flex justify-content-end">
        <Button variant="secondary" onClick={onClose} className="me-2">
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          {plannedPaper ? 'Update Planned Paper' : 'Add Planned Paper'}
        </Button>
      </div>
    </Form>
  );
};

export default PlannedPaperForm;