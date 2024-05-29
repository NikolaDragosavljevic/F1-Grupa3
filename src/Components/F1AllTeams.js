import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const F1AllTeams = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    const [allTeams, setAllTeams] = useState([]);

    const flags = props.flags;
    const year = props.year;
   
    const getAllTeams = async () => {
        try {
            await axios
                .get(`http://ergast.com/api/f1/${props.year}/constructorStandings.json`)
                .then(response => {
                    setAllTeams(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
                    setIsLoading(false);
                })
        } catch (error) {
            console.log("Something went wrong : ", error);
        }
    }

    useEffect(() => {
        getAllTeams();
    }, []);

    if (isLoading) {
        return (
            <h1>... is (still) loading ...</h1>)
    }


    return <div>
        <h3>Constructors Championship</h3>

        <table>
            <tbody>
                {allTeams.map((team) => (
                    <tr key={team.Constructor.constructorId}>
                        <td>{team.position}</td>
                        <td>{team.Constructor.nationality}{team.Constructor.name}</td>
                        <td><a target='_blank' rel='noopener noreferrer' href={team.Constructor.url}>Details</a></td>
                        <td>{team.points}</td>
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
}

export default F1AllTeams;