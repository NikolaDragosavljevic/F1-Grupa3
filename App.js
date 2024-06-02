import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Drivers from './components/Drivers';
import DriverDetails from './components/DriverDetails';
import F1Welcome from './components/F1Welcome';
import Teams from './components/Teams';
import TeamDetails from './components/TeamDetails';
import Races from './components/Races';
import RaceDetails from './components/RaceDetails';
import Navigation from './components/Navigation'; 
import YearSelector from './components/YearSelector';

function App() {
  let Year = 2013;

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<StartPage onYearChange={handleYearChange} />} />
        </Routes>
        <Navigation />
        <Routes>
          <Route path="/drivers" element={<Drivers Year={selectedYear} />} />
          <Route path="/driverDetails/:Year/:driverId" element={<DriverDetails />} />
          <Route path="/teams" element={<Teams Year={selectedYear} />} />
          <Route path="/teamDetails/:Year/:constructorId" element={<TeamDetails />} />
          <Route path="/races" element={<Races Year={selectedYear} />} />
          <Route path="/raceDetails/:Year/:circuitId" element={<RaceDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

function StartPage({ onYearChange }) {
  return (
    <div>
      <F1Welcome />
      <h1>F1 Group 3</h1>
      <YearSelector onYearChange={onYearChange} />
    </div>
  );
}

export default App;