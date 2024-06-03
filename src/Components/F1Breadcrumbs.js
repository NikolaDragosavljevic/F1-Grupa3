import { Link } from "react-router-dom";

const F1Breadcrumbs = ({ items }) => {

    return <div>
        <ul> {items?.map((crumb, i) => {
            return (
                <li key={i}>
                    {i === 0 && <img src={require("../img/icons/home.png")} style={{ maxWidth: 15 }} />}
                    {(i > 0) && (i < items.length - 1 )? (<Link to={crumb.path}>{crumb.name}</Link>) : (<span className="location-nav-btn"> {crumb.name} </span>)}
                    {/* {(i < items.length - 1 )? (<Link to={crumb.path}>{crumb.name}</Link>) : (<span className="location-nav-btn"> {crumb.name} </span>)} */}
                </li>
            );
        })}
        </ul>
    </div>

}

export default F1Breadcrumbs;