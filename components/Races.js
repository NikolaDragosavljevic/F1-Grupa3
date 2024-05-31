// src/components/Races.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Flag from 'react-flagkit'; // Import the Flag component
import './Races.css'; // Import your CSS file
import nationalityToAlpha2 from './nationalityUtils'; // Adjust the path as needed
import enshortnameToAlpha2 from './enshortnameToAlpha2'; // Adjust the path as needed

function Races({ Year }) {
    const [circuitResults, setCircuitResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // New state for search term
    const navigate = useNavigate();

    useEffect(() => {
        getRaces();
    }, []);

    const getRaces = async () => {
        console.log(Year);
        // Fetch data from the API
        axios
            .get(`http://ergast.com/api/f1/${Year}/results/1.json`)
            .then((response) => {
                const results = response.data.MRData.RaceTable.Races;
                console.log(results);
                setCircuitResults(results);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const handleRacesClick = (round) => {
        console.log("round is: " + round);
        const link = `/RaceDetails/${Year}/${round}`;
        navigate(link);
    };

    // Filter circuit results based on search term (Grand Prix or Circuit)
    const filteredResults = circuitResults.filter((race) => {
        const grandPrix = race.raceName.toLowerCase();
        const circuitName = race.Circuit.circuitName.toLowerCase();
        return grandPrix.includes(searchTerm.toLowerCase()) || circuitName.includes(searchTerm.toLowerCase());
    });

    return (
        <div>
            <h1>Race Calendar for year {Year}</h1>
            <input
                type="text"
                placeholder="Search for a Grand Prix or Circuit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th>Round</th>
                        <th>Grand Prix</th>
                        <th>Circuit</th>
                        <th>Date</th>
                        <th>Winner</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredResults.map((race) => (
                        <tr key={race.Circuit.circuitId}>
                            <td>{race.round}</td>
                            <td onClick={() => handleRacesClick(race.round)}>
                                <Flag country={enshortnameToAlpha2[race.Circuit.Location.country]} />
                                {race.raceName}
                            </td>
                            <td>{race.Circuit.circuitName}</td>
                            <td>{race.date}</td>
                            <td>
                                <Flag country={nationalityToAlpha2[race.Results[0].Driver.nationality]} />
                                {race.Results[0].Driver.familyName}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Races;
