import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Flag from 'react-flagkit'; // Import the Flag component
import './Drivers.css'; // Import your CSS file
import nationalityToAlpha2 from './nationalityUtils'; // Adjust the path as needed

function Drivers({ Year }) {
    const [driverStandings, setDriverStandings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getDrivers();
    }, []);

    const getDrivers = async () => {
        try {
            const response = await axios.get(`https://ergast.com/api/f1/${Year}/driverStandings.json`);
            const standings = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
            setDriverStandings(standings);
        } catch (error) {
            console.error('Error fetching driver standings:', error);
        }
    };

    const handleDriverClick = (driverId) => {
        const link = `/driverDetails/${Year}/${driverId}`;
        navigate(link);
    };

    // Filter the driverStandings based on the search term
    const filteredDriverStandings = driverStandings.filter(driver => {
        const fullName = `${driver.Driver.givenName} ${driver.Driver.familyName}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
    });

    return (
        <div className="App">
            <h1>F1 Driver Standings for year {Year}</h1>
            <input
                type="text"
                placeholder="Search for a driver..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul>
                {filteredDriverStandings.map(driver => (
                    <li key={driver.Driver.driverId} onClick={() => handleDriverClick(driver.Driver.driverId)}>
                        <Flag country={nationalityToAlpha2[driver.Driver.nationality]} />
                        {driver.positionText} {driver.Driver.givenName} {driver.Driver.familyName} ({driver.Constructors[0].name}) {driver.points}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Drivers;
