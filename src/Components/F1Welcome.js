import { getAllYears } from "../helpers";

const F1Welcome = (props) => {

    const years = getAllYears();

    return <div className="component-body welcome">
        <h1>Welcome : F1 FEEDER</h1>
        <p>The drivers button shows which races driver drove and how many races, by cliking on the driver name we have more information and detail about the drivers biographies. By cliking on the race we have more information and details</p>
        <p>The teams button shows constructons championship and details about racing</p>
        <p>The races button shows race calendar for selected year, details about round, grand prix, circuit, date and winner</p>

        <select size="1" defaultValue={props.year} onChange={props.handler}>
            {years.map(year => (
                <option key={year}
                    value={year}>
                    {year}
                </option>
            ))}
        </select>

        <input type="button" value="Clear Local Storage" onClick={localStorage.clear()}/>;

        <img src={require(`../img/welcome.png`)} alt="F1Feeder" />
    </div>
}

export default F1Welcome;
