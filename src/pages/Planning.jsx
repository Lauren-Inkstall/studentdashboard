import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { getPlannedPapers } from '../services/storageService';
import PlannedPaperTable from '../components/planning/PlannedPaperTable';
import PlannedPaperForm from '../components/planning/PlannedPaperForm';
import Layout from '../components/layout/Layout';

const Planning = () => {
  const [plannedPapers, setPlannedPapers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPaper, setEditingPaper] = useState(null);
  const [alert, setAlert] = useState({ show: false, variant: '', message: '' });

  useEffect(() => {
    // Load planned papers when component mounts
    loadPlannedPapers();
  }, []);

  const loadPlannedPapers = () => {
    const plannedPaperData = getPlannedPapers();
    setPlannedPapers(plannedPaperData);
  };

  const handleAddPaper = () => {
    setEditingPaper(null);
    setShowForm(true);
  };

  const handleEditPaper = (paper) => {
    setEditingPaper(paper);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingPaper(null);
  };

  const handleFormSuccess = (action) => {
    loadPlannedPapers();
    setShowForm(false);
    setEditingPaper(null);
    
    // Show success alert
    setAlert({
      show: true,
      variant: 'success',
      message: `Planned paper ${action === 'add' ? 'added' : 'updated'} successfully!`
    });
    
    // Hide alert after 3 seconds
    setTimeout(() => {
      setAlert({ show: false, variant: '', message: '' });
    }, 3000);
  };

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Future Planning</h1>
        <Button 
          variant="primary" 
          onClick={handleAddPaper}
          className="d-flex align-items-center"
        >
          <FaPlus className="me-2" /> Add Planned Paper
        </Button>
      </div>
      
      {alert.show && (
        <Alert variant={alert.variant} onClose={() => setAlert({ show: false })} dismissible>
          {alert.message}
        </Alert>
      )}
      
      <Row>
        <Col>
          {showForm ? (
            <Card className="mb-4">
              <Card.Header>
                {editingPaper ? 'Edit Planned Paper' : 'Add New Planned Paper'}
              </Card.Header>
              <Card.Body>
                <PlannedPaperForm 
                  plannedPaper={editingPaper} 
                  onClose={handleFormClose} 
                  onSuccess={handleFormSuccess} 
                />
              </Card.Body>
            </Card>
          ) : null}
          
          <Card>
            <Card.Header>Planned Papers</Card.Header>
            <Card.Body>
              <PlannedPaperTable 
                plannedPapers={plannedPapers} 
                onEdit={handleEditPaper} 
                onDelete={loadPlannedPapers} 
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default Planning;