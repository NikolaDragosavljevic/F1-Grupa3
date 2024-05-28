import { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";


const F1AllRaces = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [allRaces, setAllRaces] = useState([]);
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


    useEffect(() => {
        getAllRaces();
    }, []);

    if (isLoading) {
        return (
            <h1>... is (still) loading ...</h1>)
    }


    return <div>
        <h3>Race Calendar</h3>

        <div>Race Calendar - 2013</div>
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
                        <td>`{race.Circuit.Location.country} flag   `{race.raceName}</td>
                        <td>{race.Circuit.circuitName}</td>
                        <td>{race.date}</td>
                        <td>`{race.Results[0].Driver.nationality} flag  ` {race.Results[0].Driver.familyName}</td>
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
}

export default F1AllRaces;