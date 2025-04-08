import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'react-bootstrap';
import CustomButton from '../common/CustomButton';
import '../../styles/CalendarHeatmap.css';

const CalendarHeatmap = ({ papers }) => {
  const [calendarData, setCalendarData] = useState({});
  const [yearRange, setYearRange] = useState('');
  const [maxCount, setMaxCount] = useState(0);
  const [visibleMonths, setVisibleMonths] = useState([0, 1, 2, 3, 4, 5]); // Show 6 months by default
  const scrollContainerRef = useRef(null);
  const currentYear = new Date().getFullYear();

  // Months for display
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Short month names for display
  const shortMonths = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  // Days of the week with unique identifiers
  const daysOfWeek = [
    { id: 'mon', label: 'M' },
    { id: 'tue', label: 'T' },
    { id: 'wed', label: 'W' },
    { id: 'thu', label: 'T' },
    { id: 'fri', label: 'F' },
    { id: 'sat', label: 'S' },
    { id: 'sun', label: 'S' }
  ];

  useEffect(() => {
    if (papers && papers.length > 0) {
      // Process papers to get calendar data
      const data = {};
      let max = 0;
      let minYear = new Date().getFullYear();
      let maxYear = 2000;

      papers.forEach(paper => {
        const date = new Date(paper.timestamp);
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        
        // Update min and max years
        if (year < minYear) minYear = year;
        if (year > maxYear) maxYear = year;

        // Create key for the day
        const dateKey = `${year}-${month+1}-${day}`;
        
        if (!data[dateKey]) {
          data[dateKey] = {
            count: 0,
            papers: []
          };
        }
        
        data[dateKey].count += 1;
        data[dateKey].papers.push(paper);
        
        if (data[dateKey].count > max) {
          max = data[dateKey].count;
        }
      });

      setCalendarData(data);
      setMaxCount(max);
      setYearRange(`${minYear}-01-01 - ${maxYear}-12-31`);
    }
  }, [papers]);

  // Function to get the color based on count
  const getColor = (count) => {
    if (count === 0) return 'level-0';
    if (count <= Math.ceil(maxCount * 0.25)) return 'level-1';
    if (count <= Math.ceil(maxCount * 0.5)) return 'level-2';
    if (count <= Math.ceil(maxCount * 0.75)) return 'level-3';
    return 'level-4';
  };

  // Function to generate calendar cells for a month
  const generateMonthCells = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday, 1 = Monday, ...
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells = [];
    
    // Adjust for Monday as first day of week
    const firstDayAdjusted = firstDay === 0 ? 6 : firstDay - 1;
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayAdjusted; i++) {
      cells.push(<div key={`empty-${i}`} className="calendar-cell empty"></div>);
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}-${month+1}-${day}`;
      const dayData = calendarData[dateKey];
      const count = dayData ? dayData.count : 0;
      const colorClass = getColor(count);
      
      cells.push(
        <div 
          key={dateKey} 
          className={`calendar-cell ${colorClass}`}
          title={`${day} ${months[month]} ${year}: ${count} papers`}
        >
          {day}
        </div>
      );
    }
    
    return cells;
  };

  // Handle scrolling to previous months
  const scrollPrev = () => {
    if (visibleMonths[0] > 0) {
      const newVisibleMonths = visibleMonths.map(month => month - 1);
      setVisibleMonths(newVisibleMonths);
    }
  };

  // Handle scrolling to next months
  const scrollNext = () => {
    if (visibleMonths[visibleMonths.length - 1] < 11) {
      const newVisibleMonths = visibleMonths.map(month => month + 1);
      setVisibleMonths(newVisibleMonths);
    }
  };

  // Generate calendar for visible months only
  const generateCalendar = () => {
    const calendars = [];
    
    visibleMonths.forEach(month => {
      calendars.push(
        <div key={`month-${month}`} className="month-calendar">
          <div className="month-header">{shortMonths[month]}-{currentYear}</div>
          <div className="days-header">
            {daysOfWeek.map(day => (
              <div key={day.id} className="day-label">{day.label}</div>
            ))}
          </div>
          <div className="calendar-grid">
            {generateMonthCells(currentYear, month)}
          </div>
        </div>
      );
    });
    
    return calendars;
  };

  return (
    <Card className="mb-4">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div>
          <i className="bi bi-calendar-check me-2"></i>
          Paper Solving Activity
        </div>
        <div className="d-flex align-items-center">
          <div className="text-muted small me-3">{yearRange}</div>
          <div className="calendar-nav-buttons">
            <CustomButton 
              variant="secondary" 
              size="sm" 
              onClick={scrollPrev} 
              disabled={visibleMonths[0] === 0}
              className="nav-button"
            >
              <i className="bi bi-chevron-left"></i>
            </CustomButton>
            <CustomButton 
              variant="secondary" 
              size="sm" 
              onClick={scrollNext} 
              disabled={visibleMonths[visibleMonths.length - 1] === 11}
              className="nav-button"
            >
              <i className="bi bi-chevron-right"></i>
            </CustomButton>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <div className="calendar-scroll-container" ref={scrollContainerRef}>
          <div className="calendar-months-wrapper">
            {generateCalendar()}
          </div>
        </div>
        <div className="d-flex justify-content-end mt-3">
          <div className="heatmap-legend">
            <span className="legend-label">Less</span>
            <div className="legend-cell level-0"></div>
            <div className="legend-cell level-1"></div>
            <div className="legend-cell level-2"></div>
            <div className="legend-cell level-3"></div>
            <div className="legend-cell level-4"></div>
            <span className="legend-label">More</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CalendarHeatmap;
