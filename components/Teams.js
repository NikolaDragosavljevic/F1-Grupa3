import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Flag from 'react-flagkit'; // Import the Flag component
import './Teams.css'; // Import your CSS file
import nationalityToAlpha2 from './nationalityUtils'; // Adjust the path as needed

function Teams({ Year }) {
    const [constructorStandings, setConstructorStandings] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // New state for team name search
    const navigate = useNavigate();

    useEffect(() => {
        getTeams();
    }, []);

    const getTeams = async () => {
        console.log(Year);
        // Fetch constructor standings data
        axios
            .get(`https://ergast.com/api/f1/${Year}/constructorStandings.json`)
            .then((response) => {
                const standings = response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
                console.log(standings);
                setConstructorStandings(standings);
            })
            .catch((error) => {
                console.error('Error fetching constructor standings:', error);
                // navigate();
            });
    };

    const handleConstructorClick = (constructorId) => {
        console.log(constructorId);
        const link = `/teamDetails/${Year}/${constructorId}`;
        navigate(link);
    };

    // Filter constructor standings based on search term
    const filteredStandings = constructorStandings.filter((constructor) =>
        constructor.Constructor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="App">
            <h1>F1 Season {Year} Team Standings</h1>
            {/* New input field for team name search */}
            <input
                type="text"
                placeholder="Search for a team..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul>
                {filteredStandings.map((constructor, index) => (
                    <li
                        key={constructor.Constructor.constructorId}
                        onClick={() => handleConstructorClick(constructor.Constructor.constructorId)}
                    >
                        <span
                            className={`position-box position-${index + 1} ${
                                index >= 9 ? 'gray' : '' // Apply gray color for 10th and beyond
                            }`}
                        >
                            {constructor.positionText}
                        </span>
                        {constructor.Constructor.name}
                        <Flag country={nationalityToAlpha2[constructor.Constructor.nationality]} />
                        {constructor.points}
                        <a href={constructor.Constructor.url} rel="noreferrer">
                            Details
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Teams;
