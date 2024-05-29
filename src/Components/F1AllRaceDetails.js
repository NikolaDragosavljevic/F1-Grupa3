import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import Flag from "react-flagkit";

const F1AllRaceDetails = (props) => {
    
    const [isLoading, setIsLoading] = useState(true);
    const [raceDetails, setRaceDetails] = useState([]);
    const [raceQualifiers,setRaceQualifiers] = useState([]);
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
            setRaceDetails(response.data.MRData.RaceTable.Races.Results);
            setRaceQualifiers(response1.data.MRData.RaceTable.Races.QualifyingResults);
            setIsLoading(false);
        } catch (error) {
            console.log("Axios error ", error);
        };

    };    


    if (isLoading) {
        return (
            <h1>... is (still) loading ...</h1>)
    }



    return <div>
        <div>
            <Flag/>
        </div>
    </div>
}

export default F1AllRaceDetails;

// race.Circuit.Location.country, race.raceName,race.Circuit.Location.locality, race.date, race.round