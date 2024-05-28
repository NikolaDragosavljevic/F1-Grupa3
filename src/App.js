import React, { useEffect, useState } from 'react';
import axios from "axios";
import DisplaySwitch from './components/DisplaySwitch';


function App() {

  const [renderScene, setRenderScene] = useState(0);
  const [allDrivers, setAlldrivers] = useState([]);
  const [allTeams, setAllTeams] = useState([]);
  const [allRaces, setAllRaces] = useState([]);


  let year = 2013;

  useEffect(() => {
    getDrivers(year);
    getTeams(year);
    getRaces(year);
  }, []);

  // useEffect(() => {
  //   console.log(allRaces);;
  // }, [allTeams]);

  const handleScene = (i) => {
    setRenderScene(i);
    console.log(renderScene);
  };

  const getDrivers = async (year) => {
    const url = `http://ergast.com/api/f1/${year}/driverStandings.json`;
    try {
      const response = await axios.get(url);
      setAlldrivers(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
    } catch (error) {
      console.log("Something went wrong! : ", error);
    }
  };

  const getTeams = async (year) => {
    const url = `http://ergast.com/api/f1/${year}/constructorStandings.json`;
    try {
      const response = await axios.get(url);
      setAllTeams(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
    } catch (error) {
      console.log("Something went wrong! : ", error);
    }
  };

  const getRaces = async (year) => {
    const url = `http://ergast.com/api/f1/${year}/results/1.json`;
    try {
      const response = await axios.get(url);
      setAllRaces(response.data.MRData.RaceTable.Races);
    } catch (error) {
      console.log("Something went wrong! : ", error);
    }
  };



  return (
    <div className="App">
      <input type="button" value="test0" onClick={() => handleScene(0)} />
      <input type="button" value="test1" onClick={() => handleScene(1)} />      
        <DisplaySwitch scene = {renderScene} clickHoock = {handleScene} drivers = {allDrivers}/>
    </div>
  );
}

export default App;
