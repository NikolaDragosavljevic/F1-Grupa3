import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Flag from 'react-flagkit';
import { getFlagCode } from "../helpers";
import spinner from '../img/F1_chequered_flag_Animated.gif';


const F1AllRaces = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [allRaces, setAllRaces] = useState([]);

    const navigate = useNavigate();

    const flags = props.flags;
    const year = props.year;

    const getAllRaces = async () => {
        try {
            await axios
                .get(`http://ergast.com/api/f1/${props.year}/results/1.json`)
                .then(response => {
                    setAllRaces(response.data.MRData.RaceTable.Races);
                    setIsLoading(false);
                })
        } catch (error) {
            console.log("Something went wrong : ", error);
        }
    }

    const handleClickDetails = (id) => {
        const link = `/racedetails/${id}`;
        navigate(link);
    }

    const handleClickToDriverDetails = (driverid) => {
        const link = `/driverdetails/${driverid}`;
        navigate(link);
    };

    useEffect(() => {
        setIsLoading(true);
        getAllRaces();
    }, [year]);

    if (isLoading) {
        return (
            <div>
                <img src={spinner} style={{ width: 250, height: 250 }} />
                <h1>... data is (still) loading ...</h1>
            </div>
        )
    }


    const items = [
        { path: "/", name: "F-1 Feeder" },
        { path: "/races", name: "Races" }
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
        <h3>Race Calendar</h3>

        <div>Race Calendar - {year}</div>
        <table>
            <thead>
                <tr>
                    <th>Round</th>
                    <th>Grand Prix</th>
                    <th>Circuit</th>
                    <th>Date</th>
                    <th>Winner</th>
                </tr>
            </thead>
            <tbody>
                {allRaces.map((race) => (
                    <tr key={race.Circuit.circuitId}>
                        <td>{race.round}</td>
                        <td onClick={() => handleClickDetails(race.round)}>
                            <Flag country={getFlagCode(flags, race.Circuit.Location.country)} />
                            {race.raceName}
                        </td>
                        <td>{race.Circuit.circuitName}</td>
                        <td>{race.date}</td>
                        <td onClick={() => handleClickToDriverDetails(race.Results[0].Driver.driverId)}>
                            <Flag country={getFlagCode(flags, race.Results[0].Driver.nationality)} />
                            {race.Results[0].Driver.familyName}
                        </td> 
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
}

export default F1AllRaces;