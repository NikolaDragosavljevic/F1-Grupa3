import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"
import axios from "axios";
import spinner from '../img/F1_chequered_flag_Animated.gif';
import detailslink from '../img/link-black.png';
import Flag from 'react-flagkit';
import { getFlagCode } from "../helpers";

const F1DriverDetails = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [driverDetails, setDriverDetails] = useState({});
    const [driverRaces, setDriverRaces] = useState([]);
    const navigate = useNavigate();
    const params = useParams();
    const flags = props.flags;
    const year = props.year;

    useEffect(() => {
        setIsLoading(true);
        getDriverDetails();
    }, [year]);

    const getDriverDetails = async () => {
        const driverStandingsUrl = `http://ergast.com/api/f1/2013/drivers/${params.id}/driverStandings.json`;
        const resultsUrl = `http://ergast.com/api/f1/2013/drivers/${params.id}/results.json`;
        try {
            const driverStandingsResponse = await axios.get(driverStandingsUrl);
            const resultsResponse = await axios.get(resultsUrl);
            setDriverDetails(driverStandingsResponse.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]);
            setDriverRaces(resultsResponse.data.MRData.RaceTable.Races);
            setIsLoading(false);
        } catch (error) {
            console.log("Axios error");
        };
    };

    if (isLoading) {
        return (
            <div>
                <img src={spinner} style={{ width: 250, height: 250 }} alt="Loading spinner" />
                <h1>... is (still) loading ...</h1>
            </div>
        )
    };

    const handleClickToRacesDetails = (raceid) => {
        const link = `/racedetails/${raceid}`;
        navigate(link);
    };

    const handleClickToTeamsDetails = (teamid) => {
        const link = `/teamdetails/${teamid}`;
        navigate(link);
    };

    const items = [
        { path: "/", name: "F-1 Feeder"},
        { path: "/drivers", name: "Drivers" },
        { path: `/driverdetails/${params.id}`, name: `${driverDetails.Driver.givenName} ${driverDetails.Driver.familyName}` }
    ];

    return <div>
        <div>
            <ul> {items?.map((crumb, i) => {
                    return (
                        <ul>
                            <li key={i}>
                                {i === 0 &&  <img src={require("../img/icons/home.png")} style={{ maxWidth: 15 }} />}
                                {i < items.length - 1 ? (<Link to={crumb.path}>{crumb.name}</Link>) : (<span> {crumb.name} </span>)}
                            </li>
                        </ ul>
                    );
                })}
            </ul>
        </div>
        <div>
            <img src={require(`../img/${params.id}.jpg`)} />
            <Flag country={getFlagCode(flags, driverDetails.Driver.nationality)} />
            <p>{driverDetails.Driver.givenName}</p>
            <p>{driverDetails.Driver.familyName}</p>
        </div>
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>Country: </td>
                        <td>{driverDetails.Driver.nationality}</td>
                    </tr>
                    <tr>
                        <td>Team: </td>
                        <td>{driverDetails.Constructors[0].name}</td>
                    </tr>
                    <tr>
                        <td>Birth: </td>
                        <td>{driverDetails.Driver.dateOfBirth}</td>
                    </tr>
                    <tr>
                        <td>Biography: </td>
                        <td><a target='_blank' rel='noopener noreferrer' href={driverDetails.Driver.url}><img src={detailslink} style={{ width: 15, height: 15 }} /></a></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <table>

                <thead>
                    <tr>
                        <th colSpan="5">Formula 1 {year} Results</th>
                    </tr>
                    <tr>
                        <th>Round</th>
                        <th>Grand Prix</th>
                        <th>Team</th>
                        <th>Grid</th>
                        <th>Race</th>
                    </tr>
                </thead>
                <tbody>
                    {driverRaces.map((race) => (
                        <tr key={race.raceName}>
                            <td>{race.round}</td>
                            <td onClick={() => handleClickToRacesDetails(race.round)}>
                                <Flag country={getFlagCode(flags, race.Circuit.Location.country)} /> {race.raceName}
                            </td>
                            <td onClick={() => handleClickToTeamsDetails(race.Results[0].Constructor.constructorId)}>
                                {race.Results[0].Constructor.name}
                                </td>
                            <td>{race.Results[0].grid}</td>
                            <td>{race.Results[0].position}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
}

export default F1DriverDetails;