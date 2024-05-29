import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";

const F1AllRaceDetails = () => {
    
    const [isLoading, setIsLoading] = useState(true);
    const [raceDetails, setRaceDetails] = useState([]);
    const [raceQualifiers,setRaceQualifiers] = useState([]);
    const params = useParams();

    useEffect(() => {
        getRaceDetails();
        console.log(raceDetails, raceQualifiers);

    }, []);

    const getRaceDetails = async () => {
        const url = `http://ergast.com/api/f1/2013/${params.id}/results.json`;
        const url1 = `http://ergast.com/api/f1/2013/${params.id}/qualifying.json`;
        try {
            const response = await axios.get(url);
            const response1 = await axios.get(url1);
            setRaceDetails(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
            setRaceQualifiers(response1.data);
            setIsLoading(false);
            //console.log(response.data);
        } catch (error) {
            console.log("Axios error");
        };

    };    


    if (isLoading) {
        return (
            <h1>... is (still) loading ...</h1>)
    }

    return <div>
        <h1>Race Details</h1>
    </div>
}

export default F1AllRaceDetails;

// race.Circuit.Location.country, race.raceName,race.Circuit.Location.locality, race.date, race.round