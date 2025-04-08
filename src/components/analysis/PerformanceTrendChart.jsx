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

const PerformanceTrendChart = ({ data }) => {
  // Group data by subject
  const subjects = [...new Set(data.map(item => item.subject))];
  
  const datasets = subjects.map((subject, index) => {
    const subjectData = data.filter(item => item.subject === subject);
    
    // Generate a color based on index
    const hue = (index * 137) % 360; // Use golden angle approximation for color distribution
    
    return {
      label: subject,
      data: subjectData.map(item => item.percentage),
      borderColor: `hsl(${hue}, 70%, 50%)`,
      backgroundColor: `hsla(${hue}, 70%, 50%, 0.5)`,
      tension: 0.3,
      pointRadius: 5,
      pointHoverRadius: 7,
    };
  });
  
  const chartData = {
    labels: data.map(item => item.date),
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
            const dataPoint = data[context.dataIndex];
            return [
              `${context.dataset.label}: ${context.parsed.y.toFixed(1)}%`,
              `Paper: ${dataPoint?.paperCode || 'N/A'}`,
              `Grade: ${dataPoint?.grade || 'N/A'}`
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
    <div style={{ height: '400px' }}>
      {data.length > 0 ? (
        <Line data={chartData} options={options} />
      ) : (
        <div className="d-flex justify-content-center align-items-center h-100">
          <p className="text-muted">No data available</p>
        </div>
      )}
    </div>
  );
};

export default PerformanceTrendChart;
