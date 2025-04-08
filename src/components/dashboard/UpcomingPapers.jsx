import React from 'react';
import { Card, Table, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UpcomingPapers = ({ plannedPapers }) => {
  // Sort planned papers by deadline (ascending)
  const sortedPapers = [...plannedPapers].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  
  // Get only the next 5 papers
  const upcomingPapers = sortedPapers.slice(0, 5);
  
  // Function to determine badge color based on deadline proximity
  const getBadgeVariant = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const daysUntilDeadline = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
    
    if (daysUntilDeadline <= 3) return 'danger';
    if (daysUntilDeadline <= 7) return 'warning';
    return 'info';
  };
  
  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <span>Upcoming Papers</span>
        <Link to="/planning" className="btn btn-sm btn-outline-primary">View All</Link>
      </Card.Header>
      <Card.Body>
        {upcomingPapers.length > 0 ? (
          <Table hover responsive>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Paper Code</th>
                <th>Year/Session</th>
                <th>Deadline</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {upcomingPapers.map((paper) => (
                <tr key={paper.id}>
                  <td>{paper.subject}</td>
                  <td>{paper.paperCode}</td>
                  <td>{paper.yearSession}</td>
                  <td>
                    <Badge bg={getBadgeVariant(paper.deadline)}>
                      {new Date(paper.deadline).toLocaleDateString()}
                    </Badge>
                  </td>
                  <td>
                    <Badge bg={paper.priority === 'High' ? 'danger' : paper.priority === 'Medium' ? 'warning' : 'success'}>
                      {paper.priority}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p className="text-center text-muted">No upcoming papers planned. Add some in the Planning section.</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default UpcomingPapers;
