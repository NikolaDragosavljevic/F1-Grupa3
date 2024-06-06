import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import detailslink from '../img/link-white.png';
import Flag from 'react-flagkit';
import { getFlagCode, getCellColorCoded } from "../helpers";
import Loader from "./Loader";
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
            navigate("/");
        }
    };

    useEffect(() => {
        setIsLoading(true);
        getTeamDetails();
    }, []);

    if (isLoading) {
        return <Loader />;
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
        let pointsTest = 0;
        pointsTest = parseInt(race.Results[0].points) + parseInt(race.Results[1].points);
        return pointsTest;
    };

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

    return (<div className="component-body">
        <div className="header">
            <F1Breadcrumbs items={items} />
        </div>

        <div className="table-flex">
            <div>
                <div className="detailCard sticky-card">
                    <div>
                        <img src={getTeamImage(params.id)} alt="Team Image" style={{ maxWidth: 200 }} />
                        <h3>{teamDetails.Constructor.name} {`\u00A0`}
                            <Flag country={getFlagCode(flags, teamDetails.Constructor.nationality)} />
                        </h3>
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <td>Country: </td>
                                <td>{teamDetails.Constructor.nationality}</td>
                            </tr>
                            <tr>
                                <td>Position: </td>
                                <td>{teamDetails.position}</td>
                            </tr>
                            <tr>
                                <td>Points: </td>
                                <td>{calculateTotalPoints()}</td>
                            </tr>
                            <tr>
                                <td>History: </td>
                                <td className="external"><a target='_blank' rel='noopener noreferrer' href={teamDetails.Constructor.url}><img src={detailslink} style={{ width: 15, height: 15 }} alt="Details link" /></a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="table-wrapper">
                <table className="table">
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
                                <td className="clickable" onClick={() => handleClickToRacesDetails(race.round)}>
                                    {race.Circuit.Location.country == "Azerbaijan" ? (<img src={"https://cdn.jsdelivr.net/gh/madebybowtie/FlagKit@2.2/Assets/SVG/AZ.svg"} className="azer" alt="AZ flag" />) : (<Flag country={getFlagCode(flags, race.Circuit.Location.country)} />)}
                                    <span>{race.Circuit.circuitName}</span>
                                </td>
                                {driverLastNames.map((lastName, index) => {
                                    const driverResult = race.Results.find(result => result.Driver.familyName === lastName && result.Constructor.constructorId === params.id);
                                    return <td style={{ backgroundImage: getCellColorCoded(driverResult?.position) }} key={index}>{driverResult ? driverResult.position : "-"}</td>;
                                })}
                                <td>{addPoints(race)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );
};

export default F1AllTeamsDetails;
