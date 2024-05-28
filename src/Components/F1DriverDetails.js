import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";

const F1DriverDetails = () => {


    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [driverDetails, setDriverDetails] = useState({});

    
    useEffect(() => {
        getDriverDetails();
        console.log(driverDetails);
    }, []);

    const getDriverDetails = async () => {
        const url = `http://ergast.com/api/f1/2013/drivers/${params.id}/driverStandings.json`;
        try {
            const response = await axios.get(url);
            setDriverDetails(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
            setIsLoading(false);
           console.log(response.data);
        } catch (error) {
            console.log("Axios error");
        };

    };

    if (isLoading) {
        return (
            <h1>... is (still) loading ...</h1>)
    }


    return <div>
        <h1>Driver Details</h1>
        {/* <p>Country: {driverDetails.Driver.nationality}</p> */}
        <p>{params.id}</p>

    </div>
}

export default F1DriverDetails;