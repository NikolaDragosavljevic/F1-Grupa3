import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Flag from 'react-flagkit';
import { getFlagCode } from "../helpers";
import spinner from '../img/F1_chequered_flag_Animated.gif';


const F1AllDrivers = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [allDrivers, setAllDrivers] = useState([]);
    const navigate = useNavigate();

    const flags = props.flags;
    const year = props.year;

    const getAllDrivers = async () => {

        const allDriversUrl = `http://ergast.com/api/f1/${year}/driverStandings.json`;

        try {
            const allDriversResponse = await axios.get(allDriversUrl);
            const allDriversData = allDriversResponse.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
            setAllDrivers(allDriversData);
            setIsLoading(false);
        } catch (error) {
            console.log("Something went wrong : ", error);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        getAllDrivers();
    }, [year]);

    if (isLoading) {
        return (
            <div>
                <img src={spinner} style={{ width: 250, height: 250 }} />
                <h1>... data is (still) loading ...</h1>
            </div>
        );
    }

    const handleClickDetails = (id) => {
        // console.log(id);
        const link = `/driverdetails/${id}`;
        navigate(link);
    };

    const handleClickToTeamsDetails = (teamid) => {
        const link = `/teamdetails/${teamid}`;
        navigate(link);
    };

    const items = [
        { path: "/", name: "F-1 Feeder" },
        { path: "/drivers", name: "Drivers" }
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
        <h3>Drivers Championship</h3>
        <div>Drivers Championship Standings {year}</div>

        <table>
            <tbody>
                {allDrivers.map((driver) => (
                    <tr key={driver.Driver.driverId} >
                        <td >{driver.position}</td>
                        <td onClick={() => handleClickDetails(driver.Driver.driverId)}>
                            <Flag country={getFlagCode(flags, driver.Driver.nationality)} />
                            {`${driver.Driver.givenName} ${driver.Driver.familyName}`}
                        </td>
                        <td onClick={() => handleClickToTeamsDetails(driver.Constructors[0].constructorId)}>
                            {driver.Constructors[0].name}</td>
                        <td>{driver.points}</td>
                    </tr>
                ))}
            </tbody>
        </table>

    </div>;
};

export default F1AllDrivers;