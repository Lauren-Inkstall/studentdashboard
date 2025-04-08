/**
 * Analysis Service for Past Paper Tracker
 * Provides functions for analyzing past paper data
 */

import { getPapers } from './storageService';

// Calculate average score for a subject
export const calculateAverageScore = (subject) => {
  const papers = getPapers();
  const subjectPapers = subject 
    ? papers.filter(paper => paper.subject === subject) 
    : papers;
  
  if (subjectPapers.length === 0) {
    return 0;
  }
  
  const totalPercentage = subjectPapers.reduce((sum, paper) => {
    return sum + (paper.mark / paper.maxMark) * 100;
  }, 0);
  
  return totalPercentage / subjectPapers.length;
};

// Get performance trend data for charts
export const getPerformanceTrend = (subject) => {
  const papers = getPapers();
  let filteredPapers = papers;
  
  if (subject) {
    filteredPapers = papers.filter(paper => paper.subject === subject);
  }
  
  // Sort papers by date
  filteredPapers.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  
  return filteredPapers.map(paper => ({
    id: paper.id,
    date: new Date(paper.timestamp).toLocaleDateString(),
    subject: paper.subject,
    paperCode: paper.paperCode,
    percentage: (paper.mark / paper.maxMark) * 100,
    grade: paper.grade
  }));
};

// Get subjects with lowest average scores (areas for improvement)
export const getWeakestSubjects = (limit = 3) => {
  const papers = getPapers();
  const subjects = [...new Set(papers.map(paper => paper.subject))];
  
  const subjectAverages = subjects.map(subject => {
    const average = calculateAverageScore(subject);
    return { subject, average };
  });
  
  // Sort by average score (ascending)
  subjectAverages.sort((a, b) => a.average - b.average);
  
  return subjectAverages.slice(0, limit);
};

// Get subjects with highest average scores (strengths)
export const getStrongestSubjects = (limit = 3) => {
  const papers = getPapers();
  const subjects = [...new Set(papers.map(paper => paper.subject))];
  
  const subjectAverages = subjects.map(subject => {
    const average = calculateAverageScore(subject);
    return { subject, average };
  });
  
  // Sort by average score (descending)
  subjectAverages.sort((a, b) => b.average - a.average);
  
  return subjectAverages.slice(0, limit);
};

// Get statistics by paper type
export const getStatsByPaperType = () => {
  const papers = getPapers();
  const paperTypes = [...new Set(papers.map(paper => paper.paperType))];
  
  return paperTypes.map(paperType => {
    const typePapers = papers.filter(paper => paper.paperType === paperType);
    const average = typePapers.reduce((sum, paper) => {
      return sum + (paper.mark / paper.maxMark) * 100;
    }, 0) / typePapers.length;
    
    return {
      paperType,
      count: typePapers.length,
      average
    };
  });
};

// Get statistics by difficulty level
export const getStatsByDifficulty = () => {
  const papers = getPapers();
  const difficultyLevels = [...new Set(papers.map(paper => paper.difficulty))];
  
  return difficultyLevels.map(difficulty => {
    const difficultyPapers = papers.filter(paper => paper.difficulty === difficulty);
    const average = difficultyPapers.reduce((sum, paper) => {
      return sum + (paper.mark / paper.maxMark) * 100;
    }, 0) / difficultyPapers.length;
    
    return {
      difficulty,
      count: difficultyPapers.length,
      average
    };
  });
};

// Get overall statistics
export const getOverallStats = () => {
  const papers = getPapers();
  
  if (papers.length === 0) {
    return {
      totalPapers: 0,
      averageScore: 0,
      highestScore: 0,
      lowestScore: 0,
      totalSubjects: 0
    };
  }
  
  const percentages = papers.map(paper => (paper.mark / paper.maxMark) * 100);
  const subjects = [...new Set(papers.map(paper => paper.subject))];
  
  return {
    totalPapers: papers.length,
    averageScore: percentages.reduce((sum, p) => sum + p, 0) / percentages.length,
    highestScore: Math.max(...percentages),
    lowestScore: Math.min(...percentages),
    totalSubjects: subjects.length
  };
};
