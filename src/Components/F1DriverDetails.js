import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"
import axios from "axios";
import Loader from "./Loader";
import detailslink from '../img/link-white.png';
import Flag from 'react-flagkit';
import { getFlagCode, getCellColorCoded } from "../helpers";
import defaultDriverImage from '../img/avatar.png';
import F1Breadcrumbs from "./F1Breadcrumbs";


const F1DriverDetails = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [driverDetails, setDriverDetails] = useState({});
    const [driverRaces, setDriverRaces] = useState([]);
    const navigate = useNavigate();
    const params = useParams();
    const flags = props.flags;
    const year = props.year;


    const getDriverDetails = async () => {
        const driverStandingsUrl = `http://ergast.com/api/f1/${year}/drivers/${params.id}/driverStandings.json`;
        const resultsUrl = `http://ergast.com/api/f1/${year}/drivers/${params.id}/results.json`;
        try {
            const driverStandingsResponse = await axios.get(driverStandingsUrl);
            const resultsResponse = await axios.get(resultsUrl);
            const driverStandingsData = driverStandingsResponse.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];
            const resoultsData = resultsResponse.data.MRData.RaceTable.Races;
            setDriverDetails(driverStandingsData);
            setDriverRaces(resoultsData);
            setIsLoading(false);
        } catch (error) {
            console.log("Axios error");
        };
    };

    useEffect(() => {
        setIsLoading(true);
        getDriverDetails();
    }, [year]);

    if (isLoading) {
        return <Loader />;
    };

    const getDriverImage = (driverId) => {
        try {
            return require(`../img/${driverId}.jpg`);
        } catch (error) {
            console.log("Error loading driver image:", error);
            return defaultDriverImage;
        }
    };

    const handleClickToRacesDetails = (raceid) => {
        const link = `/racedetails/${raceid}`;
        navigate(link);
    };

    const handleClickToTeamsDetails = (teamid) => {
        const link = `/teamdetails/${teamid}`;
        navigate(link);
    };

    // const getCellColorCoded = (value) => {
    //     console.log("VVVVVVVVVVVv  ", value)
    //     if (value == 1) return 'linear-gradient(to bottom right, #f7fc6c 20%, #fafccd 86%)'
    //     else if (value == 2) return 'linear-gradient(to bottom right, #bcc6cc 20%, #f4fcfc 86%)'
    //     else if (value == 3) return 'linear-gradient(to bottom right, #fab36c 20%, #f9e2cc 86%)'
    //     else if (value == 4) return 'linear-gradient(to bottom right, #e0ffff 20%, #f1fcfc 86%)'
    //     else if (value == 5) return 'linear-gradient(to bottom right, #edffff 0%, #f4fcfc 100%)'
    //     else if (value == 6) return 'linear-gradient(to bottom right, #f1fcfc 0%, #f6fcfc 100%)'
    //     else if (value == 7) return 'linear-gradient(to bottom right, #e6e6fa 20%, #f1f1fc 86%)'
    //     else if (value == 8) return 'linear-gradient(to bottom right, #fce7ee 20%, #fff0f5 86%)'
    //     else if (value == 9) return 'linear-gradient(to bottom right, #fbf1c9 20%, #fff8dc 86%)'
    //     else if (value == 10) return 'linear-gradient(to bottom right, #f0ffff 20%, #e1fcfc 86%)'
    //     else return 'linear-gradient(to bottom right, #fcfce9 0%, #ffffff 100%)';
    // }

    const items = [
        { path: "/", name: "F-1 Feeder" },
        { path: "/drivers", name: "Drivers" },
        { path: `/driverdetails/${params.id}`, name: `${driverDetails.Driver.givenName} ${driverDetails.Driver.familyName}` }
    ];

    return <div className="component-body">
        <div className="header">
            <F1Breadcrumbs items={items} />
        </div>
        <div>
            <img src={getDriverImage(params.id)} alt="Driver Image" />
            <Flag st country={getFlagCode(flags, driverDetails.Driver.nationality)} />
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
        <div className="table-wrapper">
            <table className="table">
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
                                <Flag country={getFlagCode(flags, race.Circuit.Location.country)} className="flag-icon" /> {race.raceName}
                            </td>
                            <td onClick={() => handleClickToTeamsDetails(race.Results[0].Constructor.constructorId)}>
                                {race.Results[0].Constructor.name}
                            </td>
                            <td>{race.Results[0].grid}</td>

                            <td style={{ backgroundImage: getCellColorCoded(race.Results[0].position) }}>{race.Results[0].position}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
}

export default F1DriverDetails;