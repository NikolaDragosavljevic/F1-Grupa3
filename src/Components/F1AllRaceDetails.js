import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Flag from 'react-flagkit';
import { getFlagCode } from "../helpers";
import detailslink from '../img/link-black.png';
import spinner from '../img/F1_chequered_flag_Animated.gif';

const F1AllRaceDetails = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [raceDetails, setRaceDetails] = useState([]);
    const [raceQualifiers, setRaceQualifiers] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    const flags = props.flags;
    const year = props.year;

    const handleClickToDriverDetails = (driverid) => {
        const link = `/driverdetails/${driverid}`;
        navigate(link);
    };

    const handleClickToTeamsDetails = (teamid) => {
        const link = `/teamdetails/${teamid}`;
        navigate(link);
    };


    useEffect(() => {
        setIsLoading(true);
        getRaceDetails();
    }, [year]);

    const getRaceDetails = async () => {
        const url = `http://ergast.com/api/f1/${props.year}/${params.id}/results.json`;
        const url1 = `http://ergast.com/api/f1/${props.year}/${params.id}/qualifying.json`;
        try {
            const response = await axios.get(url);
            const response1 = await axios.get(url1);
            const responseData = response.data.MRData.RaceTable.Races[0];
            const response1Data = response1.data.MRData.RaceTable.Races[0].QualifyingResults;
            setRaceDetails(responseData);
            setRaceQualifiers(response1Data);
            setIsLoading(false);
        } catch (error) {
            console.log("Axios error ", error);
        };

    };


    if (isLoading) {
        return (
            <div>
                <img src={spinner} style={{ width: 250, height: 250 }} />
                <h1>... data is (still) loading ...</h1>
            </div>
        )
    }

    const minTime = (race) => {

        const times = [race.Q1, race.Q2, race.Q3];
        times.sort();
        return times[0];

    }

    const hasTime = (array, i) => {

        if (array[i].Time !== undefined) {
            return array[i].Time.time;
        } else {
            return "N/A";
        }

    };

    const items = [
        { path: "/", name: "F-1 Feeder" },
        { path: "/races", name: "Races" },
        { path: `/racesdetails/${params.id}`, name: `${raceDetails.raceName}` }
    ];

    return <div>
        <div>
            <ul> {items?.map((crumb, i) => {
                return (
                    <ul>
                        <li key={i}>
                            {i === 0 && <img src={require("../img/icons/home.png")} style={{ maxWidth: 15 }} />}
                            {i < items.length - 1 ? (<Link to={crumb.path}>{crumb.name}</Link>) : (<span> {crumb.name} </span>)}
                        </li>
                    </ ul>
                );
            })}
            </ul>
        </div>
        <div>
            <div>
                <Flag country={getFlagCode(flags, raceDetails.Circuit.Location.country)} />
            </div>
            <div>
                {raceDetails.raceName}
            </div>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>Country: </td>
                            <td>{raceDetails.Circuit.Location.country}</td>
                        </tr>
                        <tr>
                            <td>Location: </td>
                            <td>{raceDetails.Circuit.Location.locality}</td>
                        </tr>
                        <tr>
                            <td>Date: </td>
                            <td>{raceDetails.date}</td>
                        </tr>
                        <tr>
                            <td>Full Report: </td>
                            <td><a target='_blank' rel='noopener noreferrer' href={raceDetails.url}><img src={detailslink} style={{ width: 15, height: 15 }} /></a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div>
            <table>
                <thead>
                    <tr>
                        <th colSpan={4}>Qualifying Results</th>
                    </tr>
                    <tr>
                        <th>Pos</th>
                        <th>Driver</th>
                        <th>Team</th>
                        <th>Best Time</th>
                    </tr>
                </thead>
                <tbody>
                    {raceQualifiers.map(race => (
                        <tr key={race.position}>
                            <td>{race.position}</td>
                            <td onClick={() => handleClickToDriverDetails(race.Driver.driverId)}>
                                <Flag country={getFlagCode(flags, race.Driver.nationality)} /> {race.Driver.familyName}
                            </td>
                            <td onClick={() => handleClickToTeamsDetails(race.Constructor.constructorId)}>
                                {race.Constructor.name}
                            </td>
                            <td>{minTime(race)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div>
            <table>
                <thead>
                    <tr>
                        <th colSpan={5}>Race Results</th>
                    </tr>
                    <tr>
                        <th>Pos</th>
                        <th>Driver</th>
                        <th>Team</th>
                        <th>Result</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {raceDetails.Results.map((race, i) => (
                        <tr key={race.position}>
                            <td>{race.position}</td>
                            <td onClick={() => handleClickToDriverDetails(race.Driver.driverId)}>
                                <Flag country={getFlagCode(flags, race.Driver.nationality)} /> {race.Driver.familyName}
                            </td>
                            <td onClick={() => handleClickToTeamsDetails(race.Constructor.constructorId)}>
                                {race.Constructor.name}
                            </td>
                            <td>{hasTime(raceDetails.Results, i)}</td>
                            <td>{race.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    </div>;
};

export default F1AllRaceDetails;