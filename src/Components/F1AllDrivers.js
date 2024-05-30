import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
        try {
            await axios
                .get(`http://ergast.com/api/f1/${year}/driverStandings.json`)
                .then(response => {
                    setAllDrivers(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
                    setIsLoading(false);
                })
        } catch (error) {
            console.log("Something went wrong : ", error);
        }
    }

    useEffect(() => {
        getAllDrivers();
    }, [year]);

    if (isLoading) {
        return (
            <div>
                <img src={spinner} style={{ width: 250, height: 250 }} />
                <h1>... data is (still) loading ...</h1>
            </div>
        )
    }

    const handleClickDetails = (id) => {
        // console.log(id);
        const link = `/driverdetails/${id}`;
        navigate(link);
    };

    return <div>
        <h3>Drivers Championship</h3>
        <div>Drivers Championship Standings 2013</div>

        <table>
            <tbody>
                {allDrivers.map((driver) => (
                    <tr key={driver.Driver.driverId} >

                        <td >{driver.position}</td>
                        <td onClick={() => handleClickDetails(driver.Driver.driverId)}>
                            <Flag country={getFlagCode(flags, driver.Driver.nationality)} />
                            {`${driver.Driver.givenName} ${driver.Driver.familyName}`}                                                   </td>
                        <td>{driver.Constructors[0].name}</td>
                        <td>{driver.points}</td>
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
}

export default F1AllDrivers;