/**
 * Storage Service for Past Paper Tracker
 * Handles saving and retrieving data from local storage
 */

import { generateSampleData } from './examBoardData';

// Keys for local storage
const PAPERS_KEY = 'past_papers';
const PLANNED_PAPERS_KEY = 'planned_papers';
const INITIALIZED_KEY = 'initialized';

// Initialize sample data if not already done
const initializeSampleData = () => {
  const initialized = localStorage.getItem(INITIALIZED_KEY);
  
  if (!initialized) {
    const { samplePapers, samplePlannedPapers } = generateSampleData();
    
    // Save sample papers
    localStorage.setItem(PAPERS_KEY, JSON.stringify(samplePapers));
    
    // Save sample planned papers
    localStorage.setItem(PLANNED_PAPERS_KEY, JSON.stringify(samplePlannedPapers));
    
    // Mark as initialized
    localStorage.setItem(INITIALIZED_KEY, 'true');
    
    return true;
  }
  
  return false;
};

// Get all past papers from local storage
export const getPapers = () => {
  // Initialize sample data if needed
  initializeSampleData();
  
  const papers = localStorage.getItem(PAPERS_KEY);
  return papers ? JSON.parse(papers) : [];
};

// Save a new past paper to local storage
export const savePaper = (paper) => {
  const papers = getPapers();
  // Generate a unique ID if not provided
  if (!paper.id) {
    paper.id = Date.now().toString();
  }
  // Add timestamp if not provided
  if (!paper.timestamp) {
    paper.timestamp = new Date().toISOString();
  }
  papers.push(paper);
  localStorage.setItem(PAPERS_KEY, JSON.stringify(papers));
  return paper;
};

// Update an existing past paper
export const updatePaper = (updatedPaper) => {
  const papers = getPapers();
  const index = papers.findIndex(paper => paper.id === updatedPaper.id);
  
  if (index !== -1) {
    papers[index] = updatedPaper;
    localStorage.setItem(PAPERS_KEY, JSON.stringify(papers));
    return updatedPaper;
  }
  return null;
};

// Delete a past paper
export const deletePaper = (paperId) => {
  const papers = getPapers();
  const filteredPapers = papers.filter(paper => paper.id !== paperId);
  localStorage.setItem(PAPERS_KEY, JSON.stringify(filteredPapers));
};

// Get all planned papers from local storage
export const getPlannedPapers = () => {
  // Initialize sample data if needed
  initializeSampleData();
  
  const plannedPapers = localStorage.getItem(PLANNED_PAPERS_KEY);
  return plannedPapers ? JSON.parse(plannedPapers) : [];
};

// Save a new planned paper to local storage
export const savePlannedPaper = (plannedPaper) => {
  const plannedPapers = getPlannedPapers();
  // Generate a unique ID if not provided
  if (!plannedPaper.id) {
    plannedPaper.id = Date.now().toString();
  }
  plannedPapers.push(plannedPaper);
  localStorage.setItem(PLANNED_PAPERS_KEY, JSON.stringify(plannedPapers));
  return plannedPaper;
};

// Update an existing planned paper
export const updatePlannedPaper = (updatedPlannedPaper) => {
  const plannedPapers = getPlannedPapers();
  const index = plannedPapers.findIndex(paper => paper.id === updatedPlannedPaper.id);
  
  if (index !== -1) {
    plannedPapers[index] = updatedPlannedPaper;
    localStorage.setItem(PLANNED_PAPERS_KEY, JSON.stringify(plannedPapers));
    return updatedPlannedPaper;
  }
  return null;
};

// Delete a planned paper
export const deletePlannedPaper = (paperId) => {
  const plannedPapers = getPlannedPapers();
  const filteredPapers = plannedPapers.filter(paper => paper.id !== paperId);
  localStorage.setItem(PLANNED_PAPERS_KEY, JSON.stringify(filteredPapers));
};

// Clear all data (for testing purposes)
export const clearAllData = () => {
  localStorage.removeItem(PAPERS_KEY);
  localStorage.removeItem(PLANNED_PAPERS_KEY);
  localStorage.removeItem(INITIALIZED_KEY);
};
