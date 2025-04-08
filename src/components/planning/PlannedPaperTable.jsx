import React, { useState } from 'react';
import { Table, Button, Badge, Form, InputGroup } from 'react-bootstrap';
import { FaEdit, FaTrash, FaSearch, FaSort, FaSortUp, FaSortDown, FaCheck } from 'react-icons/fa';
import { deletePlannedPaper } from '../../services/storageService';

const PlannedPaperTable = ({ plannedPapers, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('deadline');
  const [sortDirection, setSortDirection] = useState('asc');
  
  // Handle paper deletion
  const handleDelete = (paperId) => {
    if (window.confirm('Are you sure you want to delete this planned paper? This action cannot be undone.')) {
      deletePlannedPaper(paperId);
      onDelete();
    }
  };
  
  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Get sort icon
  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort />;
    return sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />;
  };
  
  // Filter papers based on search term
  const filteredPapers = plannedPapers.filter(paper => {
    const searchFields = [
      paper.subject,
      paper.examBoard,
      paper.paperCode,
      paper.yearSession,
      paper.priority,
      paper.notes
    ];
    
    return searchFields.some(field => 
      field && field.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  
  // Sort papers
  const sortedPapers = [...filteredPapers].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    // Handle date sorting
    if (sortField === 'deadline') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    // Compare values
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
  
  // Get badge color based on priority
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'danger';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'secondary';
    }
  };
  
  // Get badge color based on deadline proximity
  const getDeadlineColor = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const daysUntilDeadline = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
    
    if (daysUntilDeadline <= 3) return 'danger';
    if (daysUntilDeadline <= 7) return 'warning';
    return 'info';
  };
  
  return (
    <div>
      <InputGroup className="mb-3">
        <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          placeholder="Search planned papers by subject, exam board, paper code, etc."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>
      
      {filteredPapers.length === 0 ? (
        <p className="text-center text-muted">
          {plannedPapers.length === 0 
            ? "No planned papers added yet. Add your first planned paper using the 'Add Planned Paper' button above."
            : "No planned papers match your search criteria."}
        </p>
      ) : (
        <div className="table-responsive">
          <Table hover>
            <thead>
              <tr>
                <th onClick={() => handleSort('deadline')} style={{ cursor: 'pointer' }}>
                  Deadline {getSortIcon('deadline')}
                </th>
                <th onClick={() => handleSort('examBoard')} style={{ cursor: 'pointer' }}>
                  Exam Board {getSortIcon('examBoard')}
                </th>
                <th onClick={() => handleSort('subject')} style={{ cursor: 'pointer' }}>
                  Subject {getSortIcon('subject')}
                </th>
                <th onClick={() => handleSort('paperCode')} style={{ cursor: 'pointer' }}>
                  Paper Code {getSortIcon('paperCode')}
                </th>
                <th onClick={() => handleSort('yearSession')} style={{ cursor: 'pointer' }}>
                  Year/Session {getSortIcon('yearSession')}
                </th>
                <th onClick={() => handleSort('paperType')} style={{ cursor: 'pointer' }}>
                  Paper Type {getSortIcon('paperType')}
                </th>
                <th onClick={() => handleSort('priority')} style={{ cursor: 'pointer' }}>
                  Priority {getSortIcon('priority')}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedPapers.map((paper) => (
                <tr key={paper.id}>
                  <td>
                    <Badge bg={getDeadlineColor(paper.deadline)}>
                      {new Date(paper.deadline).toLocaleDateString()}
                    </Badge>
                  </td>
                  <td>{paper.examBoard}</td>
                  <td>{paper.subject}</td>
                  <td>{paper.paperCode}</td>
                  <td>{paper.yearSession}</td>
                  <td>{paper.paperType}</td>
                  <td>
                    <Badge bg={getPriorityColor(paper.priority)}>
                      {paper.priority}
                    </Badge>
                  </td>
                  <td>
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      className="me-1"
                      onClick={() => onEdit(paper)}
                      title="Edit"
                    >
                      <FaEdit />
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      className="me-1"
                      onClick={() => handleDelete(paper.id)}
                      title="Delete"
                    >
                      <FaTrash />
                    </Button>
                    <Button 
                      variant="outline-success" 
                      size="sm"
                      title="Mark as Completed"
                      onClick={() => {
                        // This would typically move the paper to the completed papers list
                        // For now, just delete it
                        if (window.confirm('Mark this paper as completed? This will remove it from your planned papers.')) {
                          deletePlannedPaper(paper.id);
                          onDelete();
                        }
                      }}
                    >
                      <FaCheck />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      
      <div className="text-muted mt-2">
        Showing {filteredPapers.length} of {plannedPapers.length} planned papers
      </div>
    </div>
  );
};

export default PlannedPaperTable;
