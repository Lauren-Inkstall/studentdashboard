import { v4 as uuidv4 } from 'uuid';

const ASSIGNMENTS_STORAGE_KEY = 'past_paper_tracker_assignments';

// Sample assignment data
const sampleAssignments = [
  {
    id: uuidv4(),
    name: 'Chemistry Lab Report',
    subject: 'Chemistry',
    dueDate: '2025-04-15',
    status: 'Pending',
    priority: 'High',
    description: 'Complete the lab report for the acid-base titration experiment.'
  },
  {
    id: uuidv4(),
    name: 'English Essay',
    subject: 'English First Language',
    dueDate: '2025-04-20',
    status: 'Pending',
    priority: 'Medium',
    description: 'Write a 1500-word analytical essay on the theme of identity in the assigned novel.'
  },
  {
    id: uuidv4(),
    name: 'Mathematics Problem Set',
    subject: 'Mathematics',
    dueDate: '2025-04-10',
    status: 'Submitted',
    priority: 'Medium',
    description: 'Complete problems 1-20 in Chapter 7 on differential equations.'
  },
  {
    id: uuidv4(),
    name: 'Biology Research Paper',
    subject: 'Biology',
    dueDate: '2025-04-30',
    status: 'Pending',
    priority: 'High',
    description: 'Research paper on genetic engineering and its ethical implications (2000 words).'
  },
  {
    id: uuidv4(),
    name: 'Physics Problem Set',
    subject: 'Physics',
    dueDate: '2025-04-12',
    status: 'Pending',
    priority: 'Low',
    description: 'Complete the problems on wave mechanics and interference patterns.'
  }
];

/**
 * Get all assignments from local storage
 * @returns {Array} Array of assignment objects
 */
export const getAssignments = () => {
  const storedAssignments = localStorage.getItem(ASSIGNMENTS_STORAGE_KEY);
  
  if (!storedAssignments) {
    // If no assignments exist in storage, use sample data
    localStorage.setItem(ASSIGNMENTS_STORAGE_KEY, JSON.stringify(sampleAssignments));
    return sampleAssignments;
  }
  
  return JSON.parse(storedAssignments);
};

/**
 * Save a new assignment to local storage
 * @param {Object} assignment Assignment object to save
 * @returns {Object} Saved assignment with generated ID
 */
export const saveAssignment = (assignment) => {
  const assignments = getAssignments();
  
  const newAssignment = {
    ...assignment,
    id: uuidv4(),
    createdAt: new Date().toISOString()
  };
  
  const updatedAssignments = [...assignments, newAssignment];
  localStorage.setItem(ASSIGNMENTS_STORAGE_KEY, JSON.stringify(updatedAssignments));
  
  return newAssignment;
};

/**
 * Update an existing assignment
 * @param {Object} updatedAssignment Assignment object with updated values
 * @returns {Object} Updated assignment
 */
export const updateAssignment = (updatedAssignment) => {
  const assignments = getAssignments();
  
  const updatedAssignments = assignments.map(assignment => 
    assignment.id === updatedAssignment.id 
      ? { ...updatedAssignment, updatedAt: new Date().toISOString() } 
      : assignment
  );
  
  localStorage.setItem(ASSIGNMENTS_STORAGE_KEY, JSON.stringify(updatedAssignments));
  
  return updatedAssignment;
};

/**
 * Delete an assignment by ID
 * @param {string} id ID of the assignment to delete
 * @returns {boolean} True if deleted successfully
 */
export const deleteAssignment = (id) => {
  const assignments = getAssignments();
  
  const updatedAssignments = assignments.filter(assignment => assignment.id !== id);
  localStorage.setItem(ASSIGNMENTS_STORAGE_KEY, JSON.stringify(updatedAssignments));
  
  return true;
};

/**
 * Get assignments by status
 * @param {string} status Status to filter by ('Pending' or 'Submitted')
 * @returns {Array} Filtered assignments
 */
export const getAssignmentsByStatus = (status) => {
  const assignments = getAssignments();
  return assignments.filter(assignment => assignment.status === status);
};

/**
 * Get assignments by subject
 * @param {string} subject Subject to filter by
 * @returns {Array} Filtered assignments
 */
export const getAssignmentsBySubject = (subject) => {
  const assignments = getAssignments();
  return assignments.filter(assignment => assignment.subject === subject);
};

/**
 * Get upcoming assignments (due within the next 7 days)
 * @returns {Array} Upcoming assignments
 */
export const getUpcomingAssignments = () => {
  const assignments = getAssignments();
  const now = new Date();
  const sevenDaysLater = new Date(now);
  sevenDaysLater.setDate(now.getDate() + 7);
  
  return assignments.filter(assignment => {
    const dueDate = new Date(assignment.dueDate);
    return dueDate >= now && dueDate <= sevenDaysLater && assignment.status === 'Pending';
  });
};

/**
 * Get overdue assignments (past due date but still pending)
 * @returns {Array} Overdue assignments
 */
export const getOverdueAssignments = () => {
  const assignments = getAssignments();
  const now = new Date();
  
  return assignments.filter(assignment => {
    const dueDate = new Date(assignment.dueDate);
    return dueDate < now && assignment.status === 'Pending';
  });
};
