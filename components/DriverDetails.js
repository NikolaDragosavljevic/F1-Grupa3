// src/components/DriverDetails.js
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import avatarImage from '../img/avatar.png'; // Import the avatar image
import Flag from 'react-flagkit'; // Import the Flag component
import nationalityToAlpha2 from './nationalityUtils'; // Adjust the path as needed
import './Drivers.css'; // Import your CSS file
import detailslink from '../img/link-black.png';   //TUDJE!



const DriverDetails = () => {
    const params = useParams();
    const [raceData, setRaceData] = useState([]);
    const [driverFullName, setDriverFullName] = useState('');
    const [driverDetails, setDriverDetails] = useState({});
    const [driverFlag, setDriverFlag] = useState('');

    const [dNat, setdNat] = useState('');
    const [dCN, setdCN] = useState('');
    const [dDoB, setDDoB] = useState('');
    const [dURL, setdURL] = useState('');

    useEffect(() => {
        getDriverDetails();
    }, []);
    const getDriverDetails = async () => {

        try {
            const response = await axios.get(`https://ergast.com/api/f1/${params.Year}/drivers/${params.driverId}/results.json`);
            const { Races } = response.data.MRData.RaceTable;
            if (Races.length > 0) {
                const { Driver } = Races[0].Results[0];
                const fullName = `${Driver.givenName} ${Driver.familyName}`;
                const flagCode = Races[0].Results[0].Driver.nationality;
                setDriverFullName(fullName);
                setDriverFlag(flagCode);
                setRaceData(Races);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        };

        try {
            const driverStandingsResponse = await axios.get(`http://ergast.com/api/f1/${params.Year}/drivers/${params.driverId}/driverStandings.json`);
            const testme = driverStandingsResponse.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];
            setDriverDetails(testme);
            const testme2 = testme.Driver.nationality;
            const testme3 = testme.Constructors[0].name;
            const testme4 = testme.Driver.dateOfBirth;
            const testme5 = testme.Driver.url;
            console.log("Test me is: ");
            console.log(driverDetails);
            setdNat(testme2);
            setdCN(testme3);
            setDDoB(testme4);
            setdURL(testme5);
        } catch (error) {
            console.error('Error fetching data:', error);
        };
    };


    const imageUrl = params.driverId ? `../../assets/${params.driverId}.jpg` : `../../assets/avatar.png`; // Use absolute paths
    const handleImageError = (event) => {
        // Set the default image URL when the specified image is missing
        event.target.src = '../../assets/avatar.png'; // Replace with your default image path
    };


    return (
        <div>
            <h1>Driver Details results for season {params.Year} for driver {driverFullName} {params.driverId}</h1>
            <div className="driver-info">
                <img
                    className='driver-team-avatar'
                    // src={`../../assets/${params.driverId}.jpg`}
                    src={`../../img/${params.driverId}.jpg`}
                    alt={avatarImage}
                    // onError={handleImageError}
                />
                {/* <MyComponent imgpath={params.driverId}></MyComponent> */}
                <div className="flag-container" style={{ marginTop: '32px' }}>
                    <Flag className="flaga" country={nationalityToAlpha2[driverFlag]} />
                </div>
                <h3>{driverFullName}</h3>
            </div>
            <div>
                <h2>Driver Details</h2>
                <tbody>
                    <tr>
                        <td>Country: </td>
                        <td>{dNat}</td>
                    </tr>
                    <tr>
                        <td>Team: </td>
                        <td>{dCN}</td>
                    </tr>
                    <tr>
                        <td>Birth: </td>
                        <td>{dDoB}</td>
                    </tr>
                    <tr>
                        <td>Biography: </td>
                        <td><a target='_blank' rel='noopener noreferrer' href={dURL}><img src={detailslink} style={{ width: 15, height: 15 }} /></a></td>
                    </tr>
                </tbody>
            </div>
            <table className="race-table">
                <thead>
                    <tr>
                        <th>Race</th>
                        <th>Circuit</th>
                        <th>Position</th>
                        <th>Points</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {raceData.map(race => (
                        <tr key={race.round}>
                            <td>{race.raceName}</td>
                            <td>{race.Circuit.circuitName}</td>
                            <td>{race.Results[0].position}</td>
                            <td>{race.Results[0].points}</td>
                            <td>{race.time}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
};

export default DriverDetails;