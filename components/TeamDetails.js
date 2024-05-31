// src/components/TeamDetails.js

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";


const TeamDetails = () => {
    // const [postDetails, setPostDetails] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    const [raceData, setRaceData] = useState([]);

    // const latestConstructorIdRef = useRef(null);
    const [teamName, setTeamName] = useState('');
    // Assuming you have state variables like teamName and raceData
    // ...

    // Create an object to store team points for each race
    const [teamPointsByRace, setTeamPointsByRace] = useState({});

    useEffect(() => {
        getDriverDetails();
    }, []);

    const getDriverDetails = async () => {
        // axios.get(`https://ergast.com/api/f1/${params.Year}/drivers/${params.driverId}/results.json`)
        //     .then(response => {
        //         const { Races } = response.data.MRData.RaceTable;
        //         if (Races.length > 0) {
        //             const { Driver } = Races[0].Results[0];
        //             const fullName = `${Driver.givenName} ${Driver.familyName}`;
        //             console.log(fullName);
        //             setDriverFullName(fullName);
        //             setRaceData(Races);
        //         }
        //     })
        //     .catch(error => {
        //         console.error('Error fetching data:', error);
        //     });

        // Cancel previous request
        // if (latestConstructorIdRef.current) {
        //     latestConstructorIdRef.current = null;
        // }
        // Set the latest constructor ID
        // latestConstructorIdRef.current = params.constructorId;
        // setTeamName(params.constructorId);
        // Fetch constructor results data
        // axios.get(`https://ergast.com/api/f1/${params.Year}/constructors/${params.constructorId}/results.json`)
        //     .then(response => {
        //         // if (latestConstructorIdRef.current === params.constructorId) {
        //             const results = response.data.MRData.RaceTable.Races;
        //         if (results.length > 0) {
        //             console.log(results[0].Results[0].Constructor.name);
        //             const tName = results[0].Results[0].Constructor.name;
        //             console.log(tName);
        //             setTeamName(tName);
        //         }                    
        //             // Initialize team points for each race
        //             const updatedTeamPointsByRace = {};
        //             results.forEach(race => {
        //                 const raceName = race.raceName;
        //                 updatedTeamPointsByRace[raceName] = 0;
        //                 // Sum points for drivers in this race
        //                 race.Results.forEach(driverResult => {
        //                     // console.log("POINTS TO ADD: " + parseInt(driverResult.points));
        //                     updatedTeamPointsByRace[raceName] += parseInt(driverResult.points);
        //                     // console.log("updatedTeamPointsByRace are: " + updatedTeamPointsByRace[raceName]);
        //                 });
        //             });
        //             setRaceData(results);
        //             setTeamPointsByRace(updatedTeamPointsByRace);
        //         // }
        //     })
        //     .catch(error => {
        //         console.error('Error fetching data:', error);
        //     });
        axios.get(`https://ergast.com/api/f1/${params.Year}/constructors/${params.constructorId}/results.json`)
            .then(response => {
                const { Races } = response.data.MRData.RaceTable;
                if (Races.length > 0) {
                    const { Results } = Races[0];
                    const tName = Results[0].Constructor.name;
                    setTeamName(tName);

                    // Initialize team points for each race
                    const updatedTeamPointsByRace = {};
                    Races.forEach(race => {
                        const raceName = race.raceName;
                        updatedTeamPointsByRace[raceName] = 0;

                        // Sum points for drivers in this race
                        race.Results.forEach(driverResult => {
                            updatedTeamPointsByRace[raceName] += parseInt(driverResult.points);
                        });
                    });

                    setRaceData(Races);
                    setTeamPointsByRace(updatedTeamPointsByRace);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    return (
        <div>
            <h1>F1 Season {params.Year} Team Driver Results for each driver of team {teamName}</h1>
            <h2>ISPOD</h2>
            <h3>DOLE</h3>
            {raceData.map((race, index) => (
                <div key={index}>
                    <h2>Race {index + 1}</h2>
                    {race.raceName} ({race.Circuit.circuitName})
                    <p>Team Points: {teamPointsByRace[race.raceName]}</p>
                    <ul>
                        {race.Results.map(driverResult => (
                            <li key={driverResult.Driver.driverId}>
                                {driverResult.Driver.givenName} {driverResult.Driver.familyName} ({driverResult.points} points )
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div >
    );
};

export default TeamDetails;