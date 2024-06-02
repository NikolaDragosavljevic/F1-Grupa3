import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Flag from 'react-flagkit';
import { getFlagCode } from "../helpers";
import spinner from '../img/F1_chequered_flag_Animated.gif';
import F1Breadcrumbs from "./F1Breadcrumbs";



const F1AllDrivers = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [allDrivers, setAllDrivers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
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
    };

    const handleClickDetails = (id) => {
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

    const filteredDriverStandings = allDrivers.filter(driver => {
        const fullName = `${driver.Driver.givenName} ${driver.Driver.familyName}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
    });

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return <div>
        <F1Breadcrumbs items={items} />
        <h3>Drivers Championship</h3>
        <input
            type="text"
            placeholder="Search by driver name"
            value={searchTerm}
            onChange={handleSearchChange}
        />
        <div>Drivers Championship Standings - {year}
        </div>

        <table>
            <tbody>
                {filteredDriverStandings.map((driver) => (
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