import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, Table, Badge } from 'react-bootstrap';
import { getPapers } from '../../services/storageService';
import { getPlannedPapers } from '../../services/storageService';
import { getSubjectsByExamBoard } from '../../services/examBoardData';
import CustomSelect from '../common/CustomSelect';
import GridButton from '../common/GridButton';
import '../../styles/PaperStatusOverview.css';

const PaperStatusOverview = () => {
  const [papers, setPapers] = useState([]);
  const [plannedPapers, setPlannedPapers] = useState([]);
  const [selectedExamBoard, setSelectedExamBoard] = useState('IGCSE');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [yearSessionMap, setYearSessionMap] = useState({});
  
  // Available exam boards
  const examBoards = ['IGCSE', 'IBDP', 'AS Level', 'A Level'];
  
  // Available sessions
  const sessions = useMemo(() => ['February/March', 'May/June', 'October/November'], []);
  
  // Years (from 2009 to current year)
  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from(
      { length: currentYear - 2009 + 1 }, 
      (_, i) => (currentYear - i).toString()
    ).sort((a, b) => b - a); // Sort in descending order (newest first)
  }, []);
  
  // Generate a map of years and sessions with paper status
  const generateYearSessionMap = useCallback(() => {
    const map = {};
    
    // Initialize the map with all years and sessions
    years.forEach(year => {
      map[year] = {};
      sessions.forEach(session => {
        map[year][session] = {
          completed: [],
          planned: [],
          available: []
        };
      });
    });
    
    // Get the selected subject's papers
    const selectedSubjectObj = subjects.find(s => s.name === selectedSubject);
    
    if (selectedSubjectObj) {
      // Add available papers for each year and session
      selectedSubjectObj.papers.forEach(paper => {
        years.forEach(year => {
          sessions.forEach(session => {
            map[year][session].available.push({
              paperCode: `${selectedSubjectObj.code}/${paper.code}`,
              paperName: paper.name,
              status: 'available',
              // Add unique identifiers for each paper based on year and session
              uniqueId: `${year}-${session}-${selectedSubjectObj.code}-${paper.code}`
            });
          });
        });
      });
      
      // Mark completed papers
      papers.forEach(paper => {
        if (paper.subject === selectedSubject && paper.examBoard === selectedExamBoard) {
          const [session, year] = paper.yearSession.split(' ');
          
          if (map[year] && map[year][session]) {
            // Find the paper in available and mark as completed
            const paperIndex = map[year][session].available.findIndex(
              p => p.paperCode === paper.paperCode
            );
            
            if (paperIndex !== -1) {
              const completedPaper = {
                ...map[year][session].available[paperIndex],
                id: paper.id,
                mark: paper.mark,
                maxMark: paper.maxMark,
                grade: paper.grade,
                status: 'completed',
                uniqueId: `${year}-${session}-${paper.paperCode}-completed`
              };
              
              map[year][session].completed.push(completedPaper);
              map[year][session].available.splice(paperIndex, 1);
            }
          }
        }
      });
      
      // Mark planned papers
      plannedPapers.forEach(paper => {
        if (paper.subject === selectedSubject && paper.examBoard === selectedExamBoard) {
          const [session, year] = paper.yearSession.split(' ');
          
          if (map[year] && map[year][session]) {
            // Find the paper in available and mark as planned
            const paperIndex = map[year][session].available.findIndex(
              p => p.paperCode === paper.paperCode
            );
            
            if (paperIndex !== -1) {
              const plannedPaper = {
                ...map[year][session].available[paperIndex],
                id: paper.id,
                deadline: paper.deadline,
                priority: paper.priority,
                status: 'planned',
                uniqueId: `${year}-${session}-${paper.paperCode}-planned`
              };
              
              map[year][session].planned.push(plannedPaper);
              map[year][session].available.splice(paperIndex, 1);
            }
          }
        }
      });
    }
    
    setYearSessionMap(map);
  }, [papers, plannedPapers, selectedExamBoard, selectedSubject, subjects, years, sessions]);

  useEffect(() => {
    // Load papers and planned papers
    const loadedPapers = getPapers();
    const loadedPlannedPapers = getPlannedPapers();
    
    setPapers(loadedPapers);
    setPlannedPapers(loadedPlannedPapers);
    
    // Load subjects for the selected exam board
    const availableSubjects = getSubjectsByExamBoard(selectedExamBoard);
    setSubjects(availableSubjects);
    
    // Only set the selected subject if it's not already set
    if (availableSubjects.length > 0 && !selectedSubject) {
      setSelectedSubject(availableSubjects[0].name);
    }
  }, [selectedExamBoard, selectedSubject]);
  
  useEffect(() => {
    if (selectedSubject) {
      generateYearSessionMap();
    }
  }, [selectedSubject, generateYearSessionMap]);
  
  // Handle exam board change
  const handleExamBoardChange = (e) => {
    setSelectedExamBoard(e.target.value);
    setSelectedSubject('');
  };
  
  // Handle subject change
  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };
  
  // Render a badge for paper status
  const renderStatusBadge = (status, data) => {
    switch (status) {
      case 'completed':
        return (
          <Badge 
            bg="success" 
            className="paper-badge" 
            title={`Mark: ${data.mark}/${data.maxMark} (${data.grade})`}
          >
            {data.paperName}
          </Badge>
        );
      case 'planned':
        return (
          <Badge 
            bg="warning" 
            text="dark" 
            className="paper-badge" 
            title={`Deadline: ${data.deadline}, Priority: ${data.priority}`}
          >
            {data.paperName}
          </Badge>
        );
      default:
        return (
          <Badge 
            bg="light" 
            text="dark" 
            className="paper-badge paper-available"
          >
            {data.paperName}
          </Badge>
        );
    }
  };
  
  return (
    <Card className="mb-4">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div>
          <i className="bi bi-journal-check me-2"></i>
          Paper Status Overview
        </div>
        <div className="d-flex gap-2">
          <CustomSelect
            options={examBoards.map(board => ({ value: board, label: board }))}
            value={selectedExamBoard}
            onChange={handleExamBoardChange}
            className="me-2"
          />
          
          <CustomSelect
            options={subjects.map(subject => ({ value: subject.name, label: subject.name }))}
            value={selectedSubject}
            onChange={handleSubjectChange}
          />
          
          <GridButton color="blue" size="small" compact>
            Filter
          </GridButton>
        </div>
      </Card.Header>
      <Card.Body>
        <div className="status-legend mb-3 d-flex align-items-center">
          <Badge bg="success" className="me-2">Completed</Badge>
          <Badge bg="warning" text="dark" className="me-2">Planned</Badge>
          <Badge bg="light" text="dark" className="me-3">Available</Badge>
          
          <div className="ms-auto">
            <GridButton color="green" size="small" compact className="me-2">
              Add Paper
            </GridButton>
            <GridButton color="purple" size="small" compact>
              Export
            </GridButton>
          </div>
        </div>
        
        <div className="table-responsive">
          <div className="year-selector mb-3 d-flex align-items-center">
            <span className="me-2">Jump to year:</span>
            <CustomSelect
              options={years.map(year => ({ value: year, label: year }))}
              onChange={(e) => {
                const yearElement = document.getElementById(`year-${e.target.value}`);
                if (yearElement) {
                  yearElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />
            <GridButton color="cyan" size="small" compact className="ms-3">
              Go
            </GridButton>
          </div>
          
          <Table bordered hover className="paper-status-table">
            <thead>
              <tr>
                <th>Year/Session</th>
                {sessions.map(session => (
                  <th key={session}>{session}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {years.map(year => (
                <tr key={year} id={`year-${year}`}>
                  <td className="year-cell">{year}</td>
                  {sessions.map(session => (
                    <td key={`${year}-${session}`} className="session-cell">
                      <div className="paper-badges">
                        {yearSessionMap[year] && yearSessionMap[year][session] && (
                          <>
                            {yearSessionMap[year][session].completed.map(paper => (
                              <div key={`completed-${paper.uniqueId || `${year}-${session}-${paper.paperCode}`}`}>
                                {renderStatusBadge('completed', paper)}
                              </div>
                            ))}
                            
                            {yearSessionMap[year][session].planned.map(paper => (
                              <div key={`planned-${paper.uniqueId || `${year}-${session}-${paper.paperCode}`}`}>
                                {renderStatusBadge('planned', paper)}
                              </div>
                            ))}
                            
                            {yearSessionMap[year][session].available.map(paper => (
                              <div key={`available-${paper.uniqueId || `${year}-${session}-${paper.paperCode}`}`}>
                                {renderStatusBadge('available', paper)}
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PaperStatusOverview;
