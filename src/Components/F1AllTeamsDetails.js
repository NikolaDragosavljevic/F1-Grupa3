import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import detailslink from '../img/link-black.png';
import Flag from 'react-flagkit';
import { getFlagCode } from "../helpers";
import spinner from '../img/F1_chequered_flag_Animated.gif';
import defaultTeamImage from '../img/team.png';
import F1Breadcrumbs from "./F1Breadcrumbs";


const F1AllTeamsDetails = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [teamDetails, setTeamDetails] = useState({});
    const [driverRaces, setDriverRaces] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    const flags = props.flags;
    const year = props.year;


    const getTeamDetails = async () => {
        const constructorStandingsUrl = `http://ergast.com/api/f1/${year}/constructors/${params.id}/constructorStandings.json`;
        const resultsUrl = `http://ergast.com/api/f1/${year}/constructors/${params.id}/results.json`;
        try {
            const constructorStandingsResponse = await axios.get(constructorStandingsUrl);
            const resultsResponse = await axios.get(resultsUrl);
            setTeamDetails(constructorStandingsResponse.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0]);
            setDriverRaces(resultsResponse.data.MRData.RaceTable.Races);
            setIsLoading(false);
        } catch (error) {
            console.log("Axios error:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        getTeamDetails();
    }, [year]);

    if (isLoading) {
        return (
            <div>
                <img src={spinner} style={{ width: 250, height: 250 }} alt="Loading spinner" />
                <h1>... data is (still) loading ...</h1>
            </div>
        );
    }

    const getTeamImage = (teamId) => {
        try {
            return require(`../img/${teamId}.png`);
        } catch (error) {
            console.log("Error loading team image:", error);
            return defaultTeamImage;
        }
    };

    const calculateTotalPoints = () => {
        let totalPoints = 0;
        driverRaces.forEach(race => {
            race.Results.forEach(result => {
                totalPoints += parseInt(result.points);
            });
        });
        return totalPoints;
    };

    const addPoints = (race) => {
        let test = 0;
        test = parseInt(race.Results[0].points) + parseInt(race.Results[1].points);
        return test;
    }

    const driverLastNames = Array.from(new Set(driverRaces.flatMap(race => race.Results.map(result => result.Driver.familyName))));

    const handleClickToRacesDetails = (raceid) => {
        const link = `/racedetails/${raceid}`;
        navigate(link);
    };

    const items = [
        { path: "/", name: "F-1 Feeder" },
        { path: "/teams", name: "Teams" },
        { path: `/teamdetails/${params.id}`, name: `${teamDetails.Constructor.name}` }
    ];

    return (<div>
        <F1Breadcrumbs items={items} />
        <div>
            <img src={getTeamImage(params.id)} alt="Team Image"  style={{ maxWidth: 80 }}/>
            <Flag country={getFlagCode(flags, teamDetails.Constructor.nationality)} />
            <p>{teamDetails.Constructor.name}</p>
        </div>
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>Country: </td>
                        <td>{teamDetails.Constructor.nationality}</td>
                    </tr>
                    <tr>
                        <td>Position: {teamDetails.position}</td>
                    </tr>
                    <tr>
                        <td>Points: </td>
                        <td>{calculateTotalPoints()}</td>
                    </tr>
                    <tr>
                        <td>History: </td>
                        <td><a target='_blank' rel='noopener noreferrer' href={teamDetails.Constructor.url}><img src={detailslink} style={{ width: 15, height: 15 }} alt="Details link" /></a></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Round</th>
                        <th>Grand Prix</th>
                        {driverLastNames.map((lastName, index) => (
                            <th key={index}>{lastName}</th>
                        ))}
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {driverRaces.map(race => (
                        <tr key={race.round}>
                            <td>{race.round}</td>
                            <td onClick={() => handleClickToRacesDetails(race.round)}>
                                <Flag country={getFlagCode(flags, race.Circuit.Location.country)} /> {race.raceName}
                            </td>
                            {driverLastNames.map((lastName, index) => {
                                const driverResult = race.Results.find(result => result.Driver.familyName === lastName && result.Constructor.constructorId === params.id);
                                return <td key={index}>{driverResult ? driverResult.position : "-"}</td>;
                            })}
                            <td>{addPoints(race)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    );
}

export default F1AllTeamsDetails;
