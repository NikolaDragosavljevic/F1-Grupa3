import { NavLink } from "react-router-dom";


const menuItems = [
    {
        name: 'Welcome',
        path: '/'
    },
    {
        name: 'Drivers',
        path: '/drivers'
    },
    {
        name: 'Teams',
        path: '/teams'
    },
    {
        name: 'Races',
        path: '/races'
    }
];

const F1Menu = () => {
    return (

        <div>
            {menuItems.map(({ name, path }) => (
                <NavLink
                    key={name}
                    to={path}
                    className={`navigation-link ${({ isActive }) =>
                        isActive ? 'active' : 'inactive'}`}
                >{name}
                </NavLink>
            ))}

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