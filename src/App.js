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

function App() {
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
          <Route path='/drivers' element={<F1AllDrivers year = {Year} />} />
          <Route path='/driverdetails' element={<F1DriverDetails />} />
          <Route path='/teams' element={<F1AllTeams year = {Year}/>} />
          <Route path='/teamdetails' element={<F1AllTeamsDetails />} />
          <Route path='/races' element={<F1AllRaces year = {Year}/>} />
          <Route path='/racedetais' element={<F1AllRaceDetails />} />
        </Routes>
      </Router>
    </div>
  );



}

export default App;
