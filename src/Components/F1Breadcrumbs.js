import { Link } from "react-router-dom";

const F1Breadcrumbs = ({items}) => {

    return <div>
        <div>
            <ul> {items?.map((crumb, i) => {
                return (
                        <li key={i}>
                            {i === 0 && <img src={require("../img/icons/home.png")} style={{ maxWidth: 15 }} />}
                            {i < items.length - 1 ? (<Link to={crumb.path}>{crumb.name}</Link>) : (<span> {crumb.name} </span>)}
                        </li>
                );
            })}
            </ul>
        </div>
    </div>

}

export default F1Breadcrumbs;