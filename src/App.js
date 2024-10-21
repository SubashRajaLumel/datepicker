import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./App.css";

function QuarterYearSelector({
  selectedYears,
  selectedQuarters,
  onYearChange,
  onQuarterChange,
}) {
  const years = [2011, 2012, 2013, 2014];
  const quarters = ["Q1", "Q2", "Q3", "Q4"];

  const handleYearClick = (year) => {
    onYearChange(year);
  };

  const handleQuarterClick = (quarter) => {
    onQuarterChange(quarter);
  };

  return (
    <div className="quarter-year-selector">
      <div className="year-row">
        {years.map((year) => (
          <button
            key={year}
            className={`year-button ${
              selectedYears.includes(year) ? "selected" : ""
            }`}
            onClick={() => handleYearClick(year)}
          >
            {year}
          </button>
        ))}
      </div>
      <div className="quarter-row">
        {quarters.map((quarter) => (
          <button
            key={quarter}
            className={`quarter-button ${
              selectedQuarters.includes(quarter) ? "selected" : ""
            }`}
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
  const [selectedYears, setSelectedYears] = useState([2014]);
  const [selectedQuarters, setSelectedQuarters] = useState(["Q4"]);
  const [selectedMonths, setSelectedMonths] = useState([]); // State for selected months

  const handleYearChange = (year) => {
    setSelectedYears((prevYears) => {
      if (prevYears.includes(year)) {
        return prevYears.filter((y) => y !== year);
      } else {
        return [...prevYears, year];
      }
    });
  };

  const handleQuarterChange = (quarter) => {
    setSelectedQuarters((prevQuarters) => {
      if (prevQuarters.includes(quarter)) {
        return prevQuarters.filter((q) => q !== quarter);
      } else {
        return [...prevQuarters, quarter];
      }
    });
  };

  const handleMonthChange = (date) => {
    setSelectedMonths((prevMonths) => {
      const monthStr = `${date.getFullYear()}-${date.getMonth()}`;
      if (prevMonths.includes(monthStr)) {
        return prevMonths.filter((m) => m !== monthStr);
      } else {
        return [...prevMonths, monthStr];
      }
    });
  };

  const getWeekNumber = (date) => {
    const d = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
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
          onChange={handleMonthChange} // Handles month change
          value={null}
          tileClassName={({ date }) => {
            const monthStr = `${date.getFullYear()}-${date.getMonth()}`;
            return selectedMonths.includes(monthStr) ? "selected-month" : null;
          }}
          selectRange={false}
          view="year" // Set view to year to allow month selection
          tileDisabled={({ date }) => date.getDate() !== 1} // Disable all days except the first of each month
          formatShortWeekday={(locale, date) =>
            ["S", "M", "T", "W", "T", "F", "S"][date.getDay()]
          }
          formatWeekNumber={(date) => `W${getWeekNumber(date)}`}
        />
      </header>
    </div>
  );
}

export default App;
