// src/components/RaceDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Races.css'; // Import your CSS file
import TopQualifyingTime from './TopQualifyingTime'; // Adjust the path based on your project structure

const RaceDetails = () => {
    const params = useParams();
    const [circuitResults, setCircuitResults] = useState([]);
    const [qResults, setQResults] = useState([]);
    const [circname, setCircName] = useState('');
    const [ttime, setTtime] = useState('');

    useEffect(() => {
        getRDetails();
    }, []);

    const getRDetails = async () => {
        try {
            const response = await axios.get(
                // `https://ergast.com/api/f1/${params.Year}/circuits/${params.circuitId}/results.json` // MOJ POGRESAN PATH
                // `http://ergast.com/api/f1/${params.Year}/${params.circuitId}}/results.json`
                `http://ergast.com/api/f1/${params.Year}/${params.circuitId}/results.json`
            );
            const results = response.data.MRData.RaceTable.Races;
            // console.log(results);
            const cName = results[0].Circuit.circuitName;
            // console.log("Circuit name is: " + cName);
            setCircName(cName);
            // const cTime = results[0].Results[0].Time.time;
            // console.log("Time is: " + cTime);
            // setTtime(cTime);

            setCircuitResults(results);

            const response2 = await axios.get(
                // `https://ergast.com/api/f1/${params.Year}/circuits/${params.circuitId}/qualifying.json`  // MOJ POGRESAN PATH
                // `http://ergast.com/api/f1/${params.Year}/${params.circuitId}/qualifying.json`
                `http://ergast.com/api/f1/${params.Year}/${params.circuitId}/qualifying.json`
            );
            const results2 = response2.data.MRData.RaceTable.Races;
            // const results2 = response2.data.MRData.RaceTable.Races[0].QualifyingResults;
            console.log("ISPOD OVOGA RESULT2");
            console.log(results2);
            setQResults(results2);
            // const cTime = results2[0].Results[0].time;
            // console.log(results2[0].QualifyingResults[0].Q1);
            // setTtime(cTime);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    //https://ergast.com/api/f1/2014/circuits/albert_park/qualifying.json




    return (
        <div>
            <h1>F1 Circuit Results for Circuit {circname} in year {params.Year}</h1>
            <ul>
                {circuitResults.map(circuitRace => (
                    <li key={circuitRace.round}>
                        <ul>
                            {circuitRace.Results.map((driverResult, index) => (
                                <li key={driverResult.Driver.driverId}>
                                    <span
                                        className={`position-box position-${index + 1} ${index >= 9 ? 'gray' : '' // Apply gray color for 10th and beyond
                                            }`}
                                    >
                                        {driverResult.position}
                                    </span>

                                    <span className="driver-name">
                                        {driverResult.Driver.givenName} {driverResult.Driver.familyName}
                                    </span>
                                    {circuitRace.Results[index].Time && (
                                        <span className="driver-time">Time: {circuitRace.Results[index].Time.time}</span>
                                    )}
                                    <span className="driver-points">({driverResult.points} points)</span>
                                    <span className="driver-name">
                                        {driverResult.Constructor.name}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <hr />
                    </li>
                ))}
            </ul>
            <h2>IDEMO QUALIFIERS</h2>
            <ul>
                {qResults.map((qualRace) => (
                    <li key={qualRace.round}>
                        <ul>
                            {qualRace.QualifyingResults.map((driverResult, index) => (
                                <li key={driverResult.Driver.driverId}>
                                    <span
                                        className={`position-box position-${index + 1} ${index >= 9 ? 'gray' : '' // Apply gray color for 10th and beyond
                                            }`}
                                    >
                                        {driverResult.position}
                                    </span>

                                    <span className="driver-name">
                                        {driverResult.Driver.givenName} {driverResult.Driver.familyName}
                                    </span>
                                    {/* Use the TopQualifyingTime component */}
                                    <TopQualifyingTime
                                        qualifyingTimes={[
                                            qualRace.QualifyingResults[index].Q1,
                                            qualRace.QualifyingResults[index].Q2,
                                            qualRace.QualifyingResults[index].Q3,
                                            qualRace.QualifyingResults[index].Q4,
                                            qualRace.QualifyingResults[index].Q5
                                            // Add other qualifying times as needed
                                        ]}
                                    />

                                    <span className="driver-name">
                                        {driverResult.Constructor.name}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RaceDetails;
