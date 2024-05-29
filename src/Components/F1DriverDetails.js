import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import detailslink from '../img/link-black.png';
import Flag from 'react-flagkit';

const F1DriverDetails = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [driverDetails, setDriverDetails] = useState({});
    const [driverRaces, setDriverRaces] = useState([]);
    // const [driverFlags, setDriverFlags] = useState("");
    const params = useParams();

    useEffect(() => {
        getDriverDetails();
    }, []);

    const getDriverDetails = async () => {
        const driverStandingsUrl = `http://ergast.com/api/f1/2013/drivers/${params.id}/driverStandings.json`;
        const resultsUrl = `http://ergast.com/api/f1/2013/drivers/${params.id}/results.json`;
        try {
            const driverStandingsResponse = await axios.get(driverStandingsUrl);
            const resultsResponse = await axios.get(resultsUrl);
            setDriverDetails(driverStandingsResponse.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]);
            setDriverRaces(resultsResponse.data.MRData.RaceTable.Races);
            // setDriverFlags(driverStandingsResponse.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].riverDetails.Driver.nationality);
            setIsLoading(false);
        } catch (error) {
            console.log("Axios error");
        };
    };

    // useEffect(() => {
    //     getFlags();
    // }, []);

    const getFlags = (nationality) => {
        const flagUrl = `https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json`;
            
        const flag = flags(item => item.nationality === nationality);
        if(flag) {
            return flag[0].alpha_2_code;
        } else {
            if(nationality === "Afghan") {
                return "AF";
            }
        } 
    }


    if (isLoading) {
        return (
            <h1>... is (still) loading ...</h1>)
    }

    console.log(driverDetails);
    return <div>
        <div>
            <img src={require(`../img/${params.id}.jpg`)} />
            {/*  driverDetails.Driver.nationality*/}
            <Flag country="US" />
            {/* <Flag country={getFlags(${driverDetails.Driver.nationality})} /> */}
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
                            {/* <td>`{race.Circuit.Location.country} flag  <Flag country={getFlags()} /> `{race.raceName}</td> */}
                            <td>`{race.Circuit.Location.country} flag   `<Flag country="US" />{race.raceName}</td>
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