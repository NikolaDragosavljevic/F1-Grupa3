import { NavLink } from "react-router-dom";
import { getAllYears } from "../helpers";
import { useState } from "react";




// console.log(selectedYear);

const F1Menu = (props) => {

    // const [selectedYear, setSelectedYear] = useState (2013);
    const years = getAllYears();
    const menuItems = [
        {
            name: 'Welcome',
            path: '/'
        },
        {
            name: 'Drivers',
            path: '/drivers',
            pic: require("../img/Kaciga.png")
        },
        {
            name: 'Teams',
            path: '/teams',
            pic: require("../img/Teams.png")
        },
        {
            name: 'Races',
            path: '/races',
            pic: require("../img/Races.png")
        }
    ];

    return (

        <div>
            {menuItems.map(({ name, path, pic }) => (
                <NavLink
                    key={name}
                    to={path}
                    className={`navigation-link ${({ isActive }) =>
                        isActive ? 'active' : 'inactive'}`}
                >
                    <img src={pic} style={{ maxWidth: 80 }} />
                    {name}
                </NavLink>
            ))}

            <select size="1" defaultValue={2013} onChange={props.handler}>
                {years.map(year => (
                    <option key={year}
                        value={year}>
                        {year}
                    </option>
                ))}
            </select>


        </div>
    );






    //   <nav>
    //     <NavLink to="/" exact activeClassName="active">
    //       Home
    //     </NavLink>
    //     <NavLink to="/drivers" activeClassName="active">
    //       All Drivers
    //     </NavLink>
    //     <NavLink to="/teams" activeClassName="active">
    //       All Teams
    //     </NavLink>
    //     <NavLink to="/races" activeClassName="active">
    //       All Races
    //     </NavLink>
    //   </nav>
    // );
};

export default F1Menu;