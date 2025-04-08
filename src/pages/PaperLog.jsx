import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Alert } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { getPapers } from '../services/storageService';
import PaperTable from '../components/paperLog/PaperTable';
import PaperForm from '../components/paperLog/PaperForm';
import GridButton from '../components/common/GridButton';
import Layout from '../components/layout/Layout';

const PaperLog = () => {
  const [papers, setPapers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPaper, setEditingPaper] = useState(null);
  const [alert, setAlert] = useState({ show: false, variant: '', message: '' });

  useEffect(() => {
    // Load papers when component mounts
    loadPapers();
  }, []);

  const loadPapers = () => {
    const paperData = getPapers();
    setPapers(paperData);
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
    loadPapers();
    setShowForm(false);
    setEditingPaper(null);
    
    // Show success alert
    setAlert({
      show: true,
      variant: 'success',
      message: `Paper ${action === 'add' ? 'added' : 'updated'} successfully!`
    });
    
    // Hide alert after 3 seconds
    setTimeout(() => {
      setAlert({ show: false, variant: '', message: '' });
    }, 3000);
  };

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Paper Log</h1>
        <GridButton 
          color="green" 
          onClick={handleAddPaper}
          className="d-flex align-items-center"
        >
          <FaPlus className="me-2" /> Add Paper
        </GridButton>
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
                {editingPaper ? 'Edit Paper' : 'Add New Paper'}
              </Card.Header>
              <Card.Body>
                <PaperForm 
                  paper={editingPaper} 
                  onClose={handleFormClose} 
                  onSuccess={handleFormSuccess} 
                />
              </Card.Body>
            </Card>
          ) : null}
          
          <Card>
            <Card.Header>Past Papers</Card.Header>
            <Card.Body>
              <PaperTable 
                papers={papers} 
                onEdit={handleEditPaper} 
                onDelete={loadPapers} 
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default PaperLog;
