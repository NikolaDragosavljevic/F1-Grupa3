import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import detailslink from '../img/link-black.png';

const F1DriverDetails = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoading2, setIsLoading2] = useState(true);

    const [driverDetails, setDriverDetails] = useState({});
    const [driverRaces, setDriverRaces] = useState([]);
    const params = useParams();

    useEffect(() => {
        getDriverDetails();
    }, []);

    useEffect(() => {
        getDriverRaces();
    }, []);

    const getDriverDetails = async () => {
        const url = `http://ergast.com/api/f1/2013/drivers/${params.id}/driverStandings.json`;
        try {
            const response = await axios.get(url);
            console.log(response.data);
            setDriverDetails(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]);
            setIsLoading(false);
        } catch (error) {
            console.log("Axios error");
        };

    };

    const getDriverRaces = async () => {
        try {
            await axios
                .get(`http://ergast.com/api/f1/2013/drivers/${params.id}/results.json`)
                .then(response => {
                    setDriverRaces(response.data.MRData.RaceTable.Races);
                    setIsLoading2(false);
                })
        } catch (error) {
            console.log("Something went wrong : ", error);
        }
    }


    if (isLoading) {
        return (
            <h1>... is (still) loading ...</h1>)
    }

    if (isLoading2) {
        return (
            <h1>... is (still) loading ...</h1>)
    }

    console.log(driverDetails);
    return <div>
        <div>
            <img src={require(`../img/${params.id}.jpg`)} />
            {/* <img src={require(`../img/${params.id}.jpg`)} />
            driverDetails.Driver.nationality*/}
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
            <div>
                Formula 1 2013 Results
            </div>
            <table>
                <thead>
                    <th>Round</th>
                    <th>Grand Prix</th>
                    <th>Team</th>
                    <th>Grid</th>
                    <th>Race</th>
                </thead>
                <tbody>
                    {driverRaces.map((race) => (
                        <tr key={race.raceName}>
                            <td>{race.round}</td>
                            <td>`{race.Circuit.Location.country} flag   `{race.raceName}</td>
                            <td>{race.Results[0].Constructor.name}</td>
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