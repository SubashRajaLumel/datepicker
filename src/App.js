import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./App.css";

function QuarterYearSelector({ selectedYears, selectedQuarters, onYearChange, onQuarterChange }) {
  const years = [2011, 2012, 2013, 2014];
  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

  const handleYearClick = (year) => {
    onYearChange(year);
  };

  const handleQuarterClick = (quarter) => {
    onQuarterChange(quarter);
  };

  return (
    <div className="quarter-year-selector">
      <div className="year-row">
        {years.map(year => (
          <button
            key={year}
            className={`year-button ${selectedYears.includes(year) ? 'selected' : ''}`}
            onClick={() => handleYearClick(year)}
          >
            {year}
          </button>
        ))}
      </div>
      <div className="quarter-row">
        {quarters.map(quarter => (
          <button
            key={quarter}
            className={`quarter-button ${selectedQuarters.includes(quarter) ? 'selected' : ''}`}
            onClick={() => handleQuarterClick(quarter)}
          >
            {quarter}
          </button>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedYears, setSelectedYears] = useState([2014]);
  const [selectedQuarters, setSelectedQuarters] = useState(['Q4']);

  const handleDateChange = (date) => {
    setSelectedDates(prevDates => {
      const dateStr = date.toDateString();
      if (prevDates.some(d => d.toDateString() === dateStr)) {
        return prevDates.filter(d => d.toDateString() !== dateStr);
      } else {
        return [...prevDates, date];
      }
    });
  };

  const handleYearChange = (year) => {
    setSelectedYears(prevYears => {
      if (prevYears.includes(year)) {
        return prevYears.filter(y => y !== year);
      } else {
        return [...prevYears, year];
      }
    });
  };

  const handleQuarterChange = (quarter) => {
    setSelectedQuarters(prevQuarters => {
      if (prevQuarters.includes(quarter)) {
        return prevQuarters.filter(q => q !== quarter);
      } else {
        return [...prevQuarters, quarter];
      }
    });
  };

  const getWeekNumber = (date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  };

  const handleWeekClick = (weekNumber, date) => {
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());
    
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(weekStart);
      currentDate.setDate(weekStart.getDate() + i);
      weekDates.push(currentDate);
    }

    setSelectedDates(prevDates => {
      const newDates = [...prevDates];
      weekDates.forEach(date => {
        const dateStr = date.toDateString();
        const index = newDates.findIndex(d => d.toDateString() === dateStr);
        if (index === -1) {
          newDates.push(date);
        } else {
          newDates.splice(index, 1);
        }
      });
      return newDates;
    });
  };

  return (
    <div className="App">
      <header className="App-header"> 
        <QuarterYearSelector
          selectedYears={selectedYears}
          selectedQuarters={selectedQuarters}
          onYearChange={handleYearChange}
          onQuarterChange={handleQuarterChange}
        />
        <Calendar
          onChange={handleDateChange}
          value={null}
          tileClassName={({ date }) =>
            selectedDates.some(d => d.toDateString() === date.toDateString())
              ? "selected-date"
              : null
          }
          selectRange={false}
          showWeekNumbers={true}
          onClickWeekNumber={handleWeekClick}
          formatShortWeekday={(locale, date) => ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()]}
          formatWeekNumber={(date) => `W${getWeekNumber(date)}`}
        />  
      </header>
    </div>
  );
}

export default App;
