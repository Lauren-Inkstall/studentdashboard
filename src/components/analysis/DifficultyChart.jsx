import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const DifficultyChart = ({ data }) => {
  // Sort data by difficulty level
  const difficultyOrder = ['Easy', 'Moderate', 'Hard'];
  const sortedData = [...data].sort((a, b) => {
    return difficultyOrder.indexOf(a.difficulty) - difficultyOrder.indexOf(b.difficulty);
  });
  
  const chartData = {
    labels: sortedData.map(item => item.difficulty),
    datasets: [
      {
        label: 'Average Score (%)',
        data: sortedData.map(item => item.average),
        backgroundColor: [
          'rgba(75, 192, 192, 0.7)', // Easy - Green
          'rgba(255, 206, 86, 0.7)', // Moderate - Yellow
          'rgba(255, 99, 132, 0.7)', // Hard - Red
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
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
        text: 'Performance by Difficulty Level',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const item = sortedData[context.dataIndex];
            return [
              `${item.difficulty}: ${item.average.toFixed(1)}%`,
              `Papers: ${item.count}`
            ];
          }
        }
      }
    }
  };
  
  return (
    <div style={{ height: '300px' }}>
      {data.length > 0 ? (
        <Pie data={chartData} options={options} />
      ) : (
        <div className="d-flex justify-content-center align-items-center h-100">
          <p className="text-muted">No data available</p>
        </div>
      )}
    </div>
  );
};

export default DifficultyChart;
