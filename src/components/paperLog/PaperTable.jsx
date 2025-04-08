import React, { useState } from 'react';
import { Table, Badge, Form, InputGroup } from 'react-bootstrap';
import { FaEdit, FaTrash, FaSearch, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { deletePaper } from '../../services/storageService';
import GridButton from '../common/GridButton';

const PaperTable = ({ papers, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('timestamp');
  const [sortDirection, setSortDirection] = useState('desc');
  
  // Handle paper deletion
  const handleDelete = (paperId) => {
    if (window.confirm('Are you sure you want to delete this paper? This action cannot be undone.')) {
      deletePaper(paperId);
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
  const filteredPapers = papers.filter(paper => {
    const searchFields = [
      paper.subject,
      paper.examBoard,
      paper.paperCode,
      paper.yearSession,
      paper.grade,
      paper.comments
    ];
    
    return searchFields.some(field => 
      field && field.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  
  // Sort papers
  const sortedPapers = [...filteredPapers].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    // Handle numeric fields
    if (sortField === 'mark' || sortField === 'maxMark' || sortField === 'timeTaken') {
      aValue = parseFloat(aValue);
      bValue = parseFloat(bValue);
    }
    
    // Handle percentage calculation
    if (sortField === 'percentage') {
      aValue = (a.mark / a.maxMark) * 100;
      bValue = (b.mark / b.maxMark) * 100;
    }
    
    // Handle date sorting
    if (sortField === 'timestamp') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    // Compare values
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
  
  // Get color based on percentage
  const getPercentageColor = (mark, maxMark) => {
    const percentage = (mark / maxMark) * 100;
    if (percentage >= 80) return 'success';
    if (percentage >= 60) return 'primary';
    if (percentage >= 40) return 'warning';
    return 'danger';
  };
  
  return (
    <div>
      <InputGroup className="mb-3">
        <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          placeholder="Search papers by subject, exam board, paper code, etc."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>
      
      {filteredPapers.length === 0 ? (
        <p className="text-center text-muted">
          {papers.length === 0 
            ? "No papers added yet. Add your first paper using the 'Add Paper' button above."
            : "No papers match your search criteria."}
        </p>
      ) : (
        <div className="table-responsive">
          <Table hover>
            <thead>
              <tr>
                <th onClick={() => handleSort('timestamp')} style={{ cursor: 'pointer' }}>
                  Date Added {getSortIcon('timestamp')}
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
                <th onClick={() => handleSort('mark')} style={{ cursor: 'pointer' }}>
                  Mark {getSortIcon('mark')}
                </th>
                <th onClick={() => handleSort('percentage')} style={{ cursor: 'pointer' }}>
                  Percentage {getSortIcon('percentage')}
                </th>
                <th onClick={() => handleSort('grade')} style={{ cursor: 'pointer' }}>
                  Grade {getSortIcon('grade')}
                </th>
                <th onClick={() => handleSort('difficulty')} style={{ cursor: 'pointer' }}>
                  Difficulty {getSortIcon('difficulty')}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedPapers.map((paper) => (
                <tr key={paper.id}>
                  <td>{new Date(paper.timestamp).toLocaleDateString()}</td>
                  <td>{paper.examBoard}</td>
                  <td>{paper.subject}</td>
                  <td>{paper.paperCode}</td>
                  <td>{paper.yearSession}</td>
                  <td>{paper.mark} / {paper.maxMark}</td>
                  <td>
                    <Badge bg={getPercentageColor(paper.mark, paper.maxMark)}>
                      {((paper.mark / paper.maxMark) * 100).toFixed(1)}%
                    </Badge>
                  </td>
                  <td>{paper.grade}</td>
                  <td>
                    <Badge bg={
                      paper.difficulty === 'Easy' ? 'success' : 
                      paper.difficulty === 'Moderate' ? 'warning' : 
                      'danger'
                    }>
                      {paper.difficulty}
                    </Badge>
                  </td>
                  <td>
                    <GridButton 
                      color="blue" 
                      size="small" 
                      compact
                      className="me-1"
                      onClick={() => onEdit(paper)}
                    >
                      <FaEdit />
                    </GridButton>
                    <GridButton 
                      color="red" 
                      size="small"
                      compact
                      onClick={() => handleDelete(paper.id)}
                    >
                      <FaTrash />
                    </GridButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      
      <div className="text-muted mt-2">
        Showing {filteredPapers.length} of {papers.length} papers
      </div>
    </div>
  );
};

export default PaperTable;
