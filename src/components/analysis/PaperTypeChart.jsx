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

const PaperTypeChart = ({ data }) => {
  // Sort data by average score (descending)
  const sortedData = [...data].sort((a, b) => b.average - a.average);
  
  const chartData = {
    labels: sortedData.map(item => item.paperType),
    datasets: [
      {
        label: 'Average Score (%)',
        data: sortedData.map(item => item.average),
        backgroundColor: sortedData.map((_, index) => {
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
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Average Score by Paper Type',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const item = sortedData[context.dataIndex];
            return [
              `Average: ${item.average.toFixed(1)}%`,
              `Papers: ${item.count}`
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
          text: 'Paper Type'
        }
      }
    }
  };
  
  return (
    <div style={{ height: '300px' }}>
      {data.length > 0 ? (
        <Bar data={chartData} options={options} />
      ) : (
        <div className="d-flex justify-content-center align-items-center h-100">
          <p className="text-muted">No data available</p>
        </div>
      )}
    </div>
  );
};

export default PaperTypeChart;
