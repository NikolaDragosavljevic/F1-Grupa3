// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import ReactDOM from "react-dom";
// import F1AllTeamsDetails from "./F1AllTeamsDetails";

// const F1AllTeams = ({ year }) => {
//     const [isLoading, setIsLoading] = useState(true);
//     const [allTeams, setAllTeams] = useState([]);
//     const [selectedTeam, setSelectedTeam] = useState(null);
//     const params = useParams();

//     useEffect(() => {
//         const getAllTeams = async () => {
//             try {
//                 const response = await axios.get(`http://ergast.com/api/f1/${year}/constructorStandings.json`);
//                 setAllTeams(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
//                 setIsLoading(false);
//             } catch (error) {
//                 console.log("Something went wrong:", error);
//             }
//         };
//         getAllTeams();
//     }, [year]);

//     const handleTeamClick = (constructorId) => {
//         setSelectedTeam(constructorId);
//         openDetailsWindow(constructorId);
//     };

//     const openDetailsWindow = (constructorId) => {
//         const newWindow = window.open("", "_blank");
//         newWindow.document.write("<html><head><title>Team Details</title></head><body></body></html>");
//         newWindow.document.body.innerHTML = `<div id="details"></div>`;
//         const detailsDiv = newWindow.document.getElementById("details");

//         ReactDOM.render(<F1AllTeamsDetails constructorId={constructorId} year={year} />, detailsDiv);
//     };

//     if (isLoading) {
//         return <h1>Loading...</h1>;
//     }

//     return (
//         <div>
//             <h3>Constructors Championship</h3>
//             <table>
//                 <tbody>
//                     {allTeams.map((team) => (
//                         <tr key={team.Constructor.constructorId}>
//                             <td>{team.position}</td>
//                             <td onClick={() => handleTeamClick(team.Constructor.constructorId)}>{team.Constructor.name}</td>
//                             <td>{team.points}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default F1AllTeams;

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Flag from 'react-flagkit';
import { getFlagCode } from "../helpers";
import detailslink from '../img/link-black.png';
import spinner from '../img/F1_chequered_flag_Animated.gif';


const F1AllTeams = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    const [allTeams, setAllTeams] = useState([]);
    const navigate = useNavigate();

    const flags = props.flags;
    const year = props.year;

    const getAllTeams = async () => {
        try {
            await axios
                .get(`http://ergast.com/api/f1/${year}/constructorStandings.json`)
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
            <div>
                <img src={spinner} style={{ width: 250, height: 250 }} />
                <h1>... data is (still) loading ...</h1>
            </div>
        )
    }

    const handleClickDetails = (id) => {
        // console.log(id);
        const teamlink = `/teamdetails/${id}`;
        navigate(teamlink);
    };

    return <div>
        <h3>Constructors Championship</h3>
        <div>Constructors Championship Standings - 2013 </div>

        <table>
            <tbody>
                {allTeams.map((constructor) => (
                    <tr key={team.Constructor.constructorId} >

                        <td>{team.position}</td>
                        <td onClick={() => handleClickDetails(team.Constructor.constructorId)}>
                            <Flag country={getFlagCode(flags, team.Constructor.nationality)} />
                            {team.Constructor.name}
                        </td>
                        <td>
                            <a target='_blank' rel='noopener noreferrer' href={team.Constructor.url}>
                                Details
                                <img src={detailslink} style={{ width: 15, height: 15 }} />
                            </a>
                        </td>
                        <img src={detailslink} style={{ width: 15, height: 15 }} />
                    </a>
                            </td>
            <td>{team.points}</td>

        </tr>
                ))}
    </tbody>
        </table >

    </div >
}

export default F1AllTeams;