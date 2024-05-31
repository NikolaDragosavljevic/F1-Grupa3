import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import Flag from 'react-flagkit';
import { getFlagCode } from "../helpers";
import detailslink from '../img/link-black.png';
import spinner from '../img/F1_chequered_flag_Animated.gif';

const F1AllTeams = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [allTeams, setAllTeams] = useState([]);
    const navigate = useNavigate();
    const flags = props.flags;
    const year = props.year;
    const [searchTerm, setSearchTerm] = useState('');

    const getAllTeams = async () => {
        try {
            const allTeamsResponse = await axios.get(`http://ergast.com/api/f1/${year}/constructorStandings.json`);
            const allTeamsData = allTeamsResponse.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
            setAllTeams(allTeamsData);
            setIsLoading(false);
        } catch (error) {
            console.log("Something went wrong:", error);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        getAllTeams();
    }, [year]);

    const handleClickDetails = (id) => {
        const teamlink = `/teamdetails/${id}`;
        navigate(teamlink);
    };

    if (isLoading) {
        return (
            <div>
                <img src={spinner} style={{ width: 250, height: 250 }} />
                <h1>... data is (still) loading ...</h1>
            </div>
        );
    }

    const filteredTeams = allTeams.filter(team => {
        const teamName = team.Constructor.name.toLowerCase();
        return teamName.includes(searchTerm.toLowerCase());
    });

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value); 
    };

    const items = [
        { path: "/", name: "F-1 Feeder" },
        { path: "/teams", name: "Teams" }
    ];

    return (<div>
         <input
            type="text"
            placeholder="Search by team name"
            value={searchTerm}
            onChange={handleSearchChange}
        />
        <div>
            <ul> {items?.map((crumb, i) => {
                    return (
                        <ul>
                            <li key={i}>
                                {i === 0 &&  <img src={require("../img/icons/home.png")} style={{ maxWidth: 15 }} />}
                                {i < items.length - 1 ? (<Link to={crumb.path}>{crumb.name}</Link>) : (<span> {crumb.name} </span>)}
                            </li>
                        </ ul>
                    );
                })}
            </ul>
        </div>
            <h3>Constructors Championship</h3>
            <div>Constructors Championship Standings - {year}</div>

            <table>
                <tbody>
                    {filteredTeams.map((constructor) => (
                        <tr key={constructor.Constructor.constructorId}>
                            <td>{constructor.position}</td>
                            <td onClick={() => handleClickDetails(constructor.Constructor.constructorId)}>
                                <Flag country={getFlagCode(flags, constructor.Constructor.nationality)} />
                                {constructor.Constructor.name}
                            </td>
                            <td>
                                <a target='_blank' rel='noopener noreferrer' href={constructor.Constructor.url}>
                                    Details
                                    <img src={detailslink} style={{ width: 15, height: 15 }} />
                                </a>
                            </td>
                            <td>{constructor.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default F1AllTeams;