import { useState } from 'react';

const YearSelector = ({ onYearChange }) => {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
    const handleYearChange = (event) => {
      const year = parseInt(event.target.value, 10);
      setSelectedYear(year);
      onYearChange(year); // Notify the parent component about the selected year
    };
  
    // Generate a list of years (1950 to 2023)
    const years = Array.from({ length: 74 }, (_, index) => 2023 - index);
  
    return (
      <select value={selectedYear} onChange={handleYearChange}>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    );
  };

export default YearSelector;  