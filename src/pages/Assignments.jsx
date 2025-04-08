import React, { useState, useEffect } from 'react';
import { Card, Table, Form, Row, Col } from 'react-bootstrap';
import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa';
import GridButton from '../components/common/GridButton';
import { getAssignments, saveAssignment, deleteAssignment, updateAssignment } from '../services/assignmentService';
import '../styles/Assignments.css';
import Layout from '../components/layout/Layout';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentAssignment, setCurrentAssignment] = useState({
    id: null,
    name: '',
    subject: '',
    dueDate: '',
    status: 'Pending',
    priority: 'Medium',
    description: ''
  });

  // Load assignments when component mounts
  useEffect(() => {
    loadAssignments();
  }, []);

  const loadAssignments = () => {
    const assignmentData = getAssignments();
    setAssignments(assignmentData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentAssignment({
      ...currentAssignment,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editMode) {
      updateAssignment(currentAssignment);
    } else {
      saveAssignment(currentAssignment);
    }
    
    // Reset form and reload assignments
    resetForm();
    loadAssignments();
  };

  const handleEdit = (assignment) => {
    setCurrentAssignment(assignment);
    setEditMode(true);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      deleteAssignment(id);
      loadAssignments();
    }
  };

  const handleStatusToggle = (assignment) => {
    const updatedAssignment = {
      ...assignment,
      status: assignment.status === 'Pending' ? 'Submitted' : 'Pending'
    };
    updateAssignment(updatedAssignment);
    loadAssignments();
  };

  const resetForm = () => {
    setCurrentAssignment({
      id: null,
      name: '',
      subject: '',
      dueDate: '',
      status: 'Pending',
      priority: 'Medium',
      description: ''
    });
    setEditMode(false);
    setShowForm(false);
  };

  // Sort assignments by due date (closest first)
  const sortedAssignments = [...assignments].sort((a, b) => {
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  // Filter assignments by status
  const pendingAssignments = sortedAssignments.filter(a => a.status === 'Pending');
  const submittedAssignments = sortedAssignments.filter(a => a.status === 'Submitted');

  return (
    <Layout className="assignments-container">
      <div className="assignments-header">
        <h1>Assignments</h1>
        <GridButton 
          color="green" 
          onClick={() => {
            setShowForm(!showForm);
            if (editMode) resetForm();
          }}
        >
          {showForm ? 'Cancel' : 'Add New Assignment'}
        </GridButton>
      </div>

      {showForm && (
        <Card className="mb-4 assignment-form-card">
          <Card.Header>
            <h3>{editMode ? 'Edit Assignment' : 'Add New Assignment'}</h3>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Assignment Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={currentAssignment.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter assignment name"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      value={currentAssignment.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter subject"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="dueDate"
                      value={currentAssignment.dueDate}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Priority</Form.Label>
                    <Form.Select
                      name="priority"
                      value={currentAssignment.priority}
                      onChange={handleInputChange}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={currentAssignment.description}
                  onChange={handleInputChange}
                  placeholder="Enter assignment description"
                  rows={3}
                />
              </Form.Group>

              <div className="d-flex justify-content-end gap-2">
                <GridButton color="blue" type="submit">
                  {editMode ? 'Update Assignment' : 'Save Assignment'}
                </GridButton>
                <GridButton color="red" type="button" onClick={resetForm}>
                  Cancel
                </GridButton>
              </div>
            </Form>
          </Card.Body>
        </Card>
      )}

      <Card className="mb-4">
        <Card.Header>
          <h2>Upcoming & Pending Assignments</h2>
        </Card.Header>
        <Card.Body>
          <div className="table-responsive">
            <Table bordered hover className="assignments-table">
              <thead>
                <tr>
                  <th>Assignment Name</th>
                  <th>Subject</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingAssignments.length > 0 ? (
                  pendingAssignments.map(assignment => (
                    <tr key={assignment.id} className={`priority-${assignment.priority.toLowerCase()}`}>
                      <td>{assignment.name}</td>
                      <td>{assignment.subject}</td>
                      <td>{new Date(assignment.dueDate).toLocaleDateString()}</td>
                      <td>
                        <span className={`status-badge ${assignment.status.toLowerCase()}`}>
                          {assignment.status}
                        </span>
                      </td>
                      <td>
                        <span className={`priority-badge ${assignment.priority.toLowerCase()}`}>
                          {assignment.priority}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <GridButton color="green" size="small" compact onClick={() => handleStatusToggle(assignment)}>
                            <FaCheck />
                          </GridButton>
                          <GridButton color="blue" size="small" compact onClick={() => handleEdit(assignment)}>
                            <FaEdit />
                          </GridButton>
                          <GridButton color="red" size="small" compact onClick={() => handleDelete(assignment.id)}>
                            <FaTrash />
                          </GridButton>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">No pending assignments</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>
          <h2>Submitted Assignments</h2>
        </Card.Header>
        <Card.Body>
          <div className="table-responsive">
            <Table bordered hover className="assignments-table">
              <thead>
                <tr>
                  <th>Assignment Name</th>
                  <th>Subject</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {submittedAssignments.length > 0 ? (
                  submittedAssignments.map(assignment => (
                    <tr key={assignment.id} className="submitted-row">
                      <td>{assignment.name}</td>
                      <td>{assignment.subject}</td>
                      <td>{new Date(assignment.dueDate).toLocaleDateString()}</td>
                      <td>
                        <span className={`status-badge ${assignment.status.toLowerCase()}`}>
                          {assignment.status}
                        </span>
                      </td>
                      <td>
                        <span className={`priority-badge ${assignment.priority.toLowerCase()}`}>
                          {assignment.priority}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <GridButton color="orange" size="small" compact onClick={() => handleStatusToggle(assignment)}>
                            <FaCheck />
                          </GridButton>
                          <GridButton color="blue" size="small" compact onClick={() => handleEdit(assignment)}>
                            <FaEdit />
                          </GridButton>
                          <GridButton color="red" size="small" compact onClick={() => handleDelete(assignment.id)}>
                            <FaTrash />
                          </GridButton>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">No submitted assignments</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </Layout>
  );
};

export default Assignments;
