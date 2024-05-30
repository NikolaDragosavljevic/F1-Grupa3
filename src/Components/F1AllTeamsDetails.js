// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const F1AllTeamsDetails = ({ constructorId, year }) => {
//     const [teamDetails, setTeamDetails] = useState(null);
//     const [drivers, setDrivers] = useState([]);
//     const [races, setRaces] = useState([]);

//     useEffect(() => {
//         const getTeamDetails = async () => {
//             try {
//                 const response = await axios.get(`http://ergast.com/api/f1/${year}/constructors/${constructorId}/constructorStandings.json`);
//                 const constructorStandings = response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0];
//                 setTeamDetails(constructorStandings);
//                 const driverResponse = await axios.get(`http://ergast.com/api/f1/${year}/constructors/${constructorId}/drivers.json`);
//                 const teamDrivers = driverResponse.data.MRData.DriverTable.Drivers;
//                 setDrivers(teamDrivers);

//                 const racesResponse = await axios.get(`http://ergast.com/api/f1/${year}.json`);
//                 const racesData = racesResponse.data.MRData.RaceTable.Races;
//                 setRaces(racesData);
//             } catch (error) {
//                 console.log("Something went wrong:", error);
//             }
//         };
//         getTeamDetails();
//     }, [constructorId, year]);

//     if (!teamDetails) return null;

   
//     const rounds = races.map(race => ({ round: race.round, raceName: race.raceName }));

//     return (
//         <div>
//             <h3>{teamDetails.Constructor.name} Details</h3>
//             <p>Country: {teamDetails.Constructor.nationality}</p>
//             <p>Position: {teamDetails.position}</p>
//             <p>Points: {teamDetails.points}</p>
//             <p>History: <a href={teamDetails.Constructor.url} target="_blank" rel="noopener noreferrer">Open History</a></p>
//             <p>Drivers:</p>
//             <ul>
//                 {drivers.map((driver, index) => (
//                     <li key={index}>{driver.givenName} {driver.familyName} - {driver.points}</li>
//                 ))}
//             </ul>
//             <p>Grand Prix:</p>
//             <ul>
//                 {rounds.map((round, index) => (
//                     <li key={index}>Round {round.round} - {round.raceName}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default F1AllTeamsDetails;

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom"
// import axios from "axios";
// import detailslink from '../img/link-black.png';
// import Flag from 'react-flagkit';
// import { getFlagCode } from "../helpers";

// const F1TeamsDetails = (props) => {
//     const [isLoading, setIsLoading] = useState(true);
//     const [dteamsDetails, setTeamsDetails] = useState({});
//     const [teamRaces, setTeamRaces] = useState([]);
//     const params = useParams();
//     const flags = props.flags;
//     const year = props.year;

//     useEffect(() => {
//         getTeamsDetails();
//     }, []);

//     const getTeamsDetails = async () => {
//         const driverStandingsUrl = `http://ergast.com/api/f1/${year}/constructors/${constructorId}/constructorStandings.json`;
//         const resultsUrl = `http://ergast.com/api/f1/2013/drivers/${params.id}/results.json`;
//         try {
//             const driverStandingsResponse = await axios.get(driverStandingsUrl);
//             const resultsResponse = await axios.get(resultsUrl);
//             setDriverDetails(driverStandingsResponse.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]);
//             setDriverRaces(resultsResponse.data.MRData.RaceTable.Races);
//             setIsLoading(false);
//         } catch (error) {
//             console.log("Axios error");
//         };
//     };

//     if (isLoading) {
//         return (
//             <h1>... is (still) loading ...</h1>)
//     }


//     return <div>
//         <div>
//             <img src={require(`../img/${params.id}.jpg`)} />
//             <Flag country={getFlagCode(flags, driverDetails.Driver.nationality)} />
//             <p>{driverDetails.Driver.givenName}</p>
//             <p>{driverDetails.Driver.familyName}</p>
//         </div>
//         <div>
//             <table>
//                 <tbody>
//                     <tr>
//                         <td>Country: </td>
//                         <td>{driverDetails.Driver.nationality}</td>
//                     </tr>
//                     <tr>
//                         <td>Team: </td>
//                         <td>{driverDetails.Constructors[0].name}</td>
//                     </tr>
//                     <tr>
//                         <td>Birth: </td>
//                         <td>{driverDetails.Driver.dateOfBirth}</td>
//                     </tr>
//                     <tr>
//                         <td>Biography: </td>
//                         <td><a target='_blank' rel='noopener noreferrer' href={driverDetails.Driver.url}><img src={detailslink} style={{ width: 15, height: 15 }} /></a></td>
//                     </tr>
//                 </tbody>
//             </table>
//         </div>
//         <div>
//             <table>

//                 <thead>
//                     <tr>
//                         <th colSpan="5">Formula 1 {year} Results</th>
//                     </tr>
//                     <tr>
//                         <th>Round</th>
//                         <th>Grand Prix</th>
//                         <th>Team</th>
//                         <th>Grid</th>
//                         <th>Race</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {driverRaces.map((race) => (
//                         <tr key={race.raceName}>
//                             <td>{race.round}</td>
//                             <td>  <Flag country={getFlagCode(flags, race.Circuit.Location.country)} /> {race.raceName}</td>
//                             <td>{race.Results[0].Constructor.name}</td>
//                             <td>{race.Results[0].grid}</td>
//                             <td>{race.Results[0].position}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     </div>
// }

// export default F1DriverDetails;