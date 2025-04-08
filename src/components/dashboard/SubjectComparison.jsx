import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SubjectComparison = ({ papers }) => {
  // Group papers by subject and calculate average scores
  const subjects = [...new Set(papers.map(paper => paper.subject))];
  
  const subjectAverages = subjects.map(subject => {
    const subjectPapers = papers.filter(paper => paper.subject === subject);
    const average = subjectPapers.reduce((sum, paper) => {
      return sum + (paper.mark / paper.maxMark) * 100;
    }, 0) / subjectPapers.length;
    
    return {
      subject,
      average,
      count: subjectPapers.length
    };
  });
  
  // Sort by average score (descending)
  subjectAverages.sort((a, b) => b.average - a.average);
  
  const chartData = {
    labels: subjectAverages.map(item => item.subject),
    datasets: [
      {
        label: 'Average Score (%)',
        data: subjectAverages.map(item => item.average),
        backgroundColor: subjectAverages.map((_, index) => {
          const hue = (index * 137) % 360; // Use golden angle approximation for color distribution
          return `hsla(${hue}, 70%, 50%, 0.7)`;
        }),
        borderWidth: 1,
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y', // Horizontal bar chart
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Average Score by Subject',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const item = subjectAverages[context.dataIndex];
            return [
              `Average: ${item.average.toFixed(1)}%`,
              `Papers: ${item.count}`
            ];
          }
        }
      }
    },
    scales: {
      x: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: 'Percentage (%)'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Subject'
        }
      }
    }
  };
  
  return (
    <div style={{ height: '300px' }}>
      {papers.length > 0 ? (
        <Bar data={chartData} options={options} />
      ) : (
        <div className="d-flex justify-content-center align-items-center h-100">
          <p className="text-muted">No data available</p>
        </div>
      )}
    </div>
  );
};

export default SubjectComparison;
