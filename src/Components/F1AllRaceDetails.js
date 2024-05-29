import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Flag from "react-flagkit";
import detailslink from '../img/link-black.png';

const F1AllRaceDetails = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [raceDetails, setRaceDetails] = useState([]);
    const [raceQualifiers, setRaceQualifiers] = useState([]);
    const params = useParams();

    useEffect(() => {
        getRaceDetails();
    }, []);

    const getRaceDetails = async () => {
        const url = `http://ergast.com/api/f1/${props.year}/${params.id}/results.json`;
        const url1 = `http://ergast.com/api/f1/${props.year}/${params.id}/qualifying.json`;
        try {
            const response = await axios.get(url);
            const response1 = await axios.get(url1);
            setRaceDetails(response.data.MRData.RaceTable.Races);
            setRaceQualifiers(response1.data.MRData.RaceTable.Races.QualifyingResults);
            setIsLoading(false);
        } catch (error) {
            console.log("Axios error ", error);
        };

    };


    if (isLoading) {
        return (
            <h1>... is (still) loading ...</h1>);
    }




    return <div>
        <div>
            <div>
                <Flag />
            </div>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>Country: </td>
                            <td>{raceDetails[0].Circuit.Location.country}</td>
                        </tr>
                        <tr>
                            <td>Location: </td>
                            <td>{raceDetails[0].Circuit.Location.locality}</td>
                        </tr>
                        <tr>
                            <td>Date: </td>
                            <td>{raceDetails[0].date}</td>
                        </tr>
                        <tr>
                            <td>Full Report: </td>
                            <td><a target='_blank' rel='noopener noreferrer' href={raceDetails[0].url}><img src={detailslink} style={{ width: 15, height: 15 }} /></a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div>
            <table>
                <thead>
                    <th>Pos</th>
                    <th>Driver</th>
                    <th>Team</th>
                    <th>Best Time</th>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    </div>;
};

export default F1AllRaceDetails;