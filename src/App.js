import './App.css';
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";
import F1AllDrivers from './Components/F1AllDrivers';
import F1AllTeams from './Components/F1AllTeams';
import F1AllRaces from './Components/F1AllRaces';
import F1Menu from './Components/F1Menu';
import F1Welcome from './Components/F1Welcome';
import F1DriverDetails from './Components/F1DriverDetails';
import F1AllTeamsDetails from './Components/F1AllTeamsDetails';
import F1AllRaceDetails from './Components/F1AllRaceDetails';
import { useEffect, useState } from 'react';
import axios from "axios";

function App() {
  const [allFlags, setAllFlags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllFlags();
  }, []);

  const getAllFlags = async () => {
    const flagUrl = `https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json`;
    try {
      const allFlagsResponse = await axios.get(flagUrl);
      setAllFlags(allFlagsResponse.data);
      setIsLoading(false);
    } catch (error) {
      console.log("Axios error");
    };
  }

  if (isLoading) {
    return (
      <h1>... is (still) loading ...</h1>)
  }


  let Year = 2013;

  return (
    <div>
      <Router>
        <div>
          <F1Menu />
          <h1>F1 Group 3</h1>
        </div>
        <Routes>
          <Route path='/' element={<F1Welcome />} />
          <Route path='/drivers' element={<F1AllDrivers year={Year} flags={allFlags} />} />
          <Route path='/driverdetails/:id' element={<F1DriverDetails  year={Year} flags={allFlags} />} />
          <Route path='/teams' element={<F1AllTeams year={Year}flags={allFlags}  />} />
          <Route path='/teamdetails/:id' element={<F1AllTeamsDetails year={Year}  flags={allFlags} />} />
          <Route path='/races' element={<F1AllRaces year={Year} flags={allFlags} />} />
          <Route path='/racedetais/:id' element={<F1AllRaceDetails  year={Year} flags={allFlags} />} />
        </Routes>
      </Router>
    </div>
  );





}

export default App;
