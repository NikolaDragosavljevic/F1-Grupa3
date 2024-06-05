import { NavLink } from "react-router-dom";
import { getAllYears } from "../helpers";

const F1Menu = (props) => {

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
            pic: require("../img/Races5.png")
        }
    ];

    return (

        <div className="menu-body sticky-el">

            <div className="sticky-el">
                <img className="navigation-link" src={require(`../img/f1feeder.png`)} alt="F1Feeder" style={{ maxWidth: 200 }} />
                {menuItems.map(({ name, path, pic }) => (
                    <NavLink
                        key={name}
                        to={path}
                        className={`navigation-link ${({ isActive }) =>
                            isActive ? 'active' : 'inactive'}`}
                    >
                        <img src={pic} alt="Nav img" style={{ maxWidth: 80 }} />
                        <span>{name}</span>
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
        </div>
    );

};

export default F1Menu;