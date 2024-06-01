import { Link } from "react-router-dom";

const F1Breadcrumbs = ({items}) => {

    // const crumbs = [];

    return <div>
        <div>
            <ul> {items?.map((crumb, i) => {
                return (
                    <ul key={i}>
                        <li>
                            {i === 0 && <img src={require("../img/icons/home.png")} style={{ maxWidth: 15 }} />}
                            {i < items.length - 1 ? (<Link to={crumb.path}>{crumb.name}</Link>) : (<span> {crumb.name} </span>)}
                        </li>
                    </ ul>
                );
            })}
            </ul>
        </div>
    </div>

}

export default F1Breadcrumbs;