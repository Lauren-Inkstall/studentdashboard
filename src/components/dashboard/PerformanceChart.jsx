import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PerformanceChart = ({ papers }) => {
  // Sort papers by date
  const sortedPapers = [...papers].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  
  // Extract data for chart
  const labels = sortedPapers.map(paper => {
    const date = new Date(paper.timestamp);
    return date.toLocaleDateString();
  });
  
  // Group data by subject
  const subjects = [...new Set(papers.map(paper => paper.subject))];
  const datasets = subjects.map((subject, index) => {
    const subjectPapers = sortedPapers.filter(paper => paper.subject === subject);
    const subjectDates = subjectPapers.map(paper => new Date(paper.timestamp).toLocaleDateString());
    const subjectPercentages = subjectPapers.map(paper => (paper.mark / paper.maxMark) * 100);
    
    // Generate a color based on index
    const hue = (index * 137) % 360; // Use golden angle approximation for color distribution
    
    return {
      label: subject,
      data: subjectPercentages,
      borderColor: `hsl(${hue}, 70%, 50%)`,
      backgroundColor: `hsla(${hue}, 70%, 50%, 0.5)`,
      tension: 0.3,
      pointRadius: 4,
      pointHoverRadius: 6,
      xAxisID: 'x',
      yAxisID: 'y',
      // Map the dates to the global labels array
      // This ensures all lines use the same x-axis points
      pointBackgroundColor: subjectDates.map(date => `hsl(${hue}, 70%, 50%)`),
    };
  });
  
  const chartData = {
    labels,
    datasets,
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Performance Trend Over Time',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const paper = sortedPapers[context.dataIndex];
            return [
              `${context.dataset.label}: ${context.parsed.y.toFixed(1)}%`,
              `Paper: ${paper?.paperCode || 'N/A'}`,
              `Grade: ${paper?.grade || 'N/A'}`
            ];
          }
        }
      }
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: 'Percentage (%)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      }
    }
  };
  
  return (
    <div style={{ height: '300px' }}>
      {papers.length > 0 ? (
        <Line data={chartData} options={options} />
      ) : (
        <div className="d-flex justify-content-center align-items-center h-100">
          <p className="text-muted">No data available</p>
        </div>
      )}
    </div>
  );
};

export default PerformanceChart;
