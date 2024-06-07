import { getAllYears } from "../helpers";

const F1Welcome = (props) => {

    const years = getAllYears();

    return <div className="component-body welcome">

        <div className="title-wrapper">
            <h1>F1 FEEDER</h1>
        </div>

        <div className="btn-wrapper">
            <div className="buttons">
                <span className="ribbon-number">&nbsp;1 ›</span>
                <span className="ribbon">SELECT YEAR</span>
                <select size="1" defaultValue={props.year} name="select" onChange={props.handler}>
                    {years.map(year => (
                        <option key={year}
                            name={year}
                            value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
        </div>


        <div className="side-info-wrapper">
            <div className="side-infobit-wrapper">
                <span className="ribbon-number-info">‹ 2&nbsp;</span>
            </div>
            <div className="side-infobit-wrapper">
                <span className="ribbon-info-main">SELECT DRIVER, TEAM, OR RACE STATS</span>
            </div>
            <div className="side-infobit-wrapper">
                <span className="ribbon-info-detail">(... then you can pick one to see their details)</span>
            </div>
        </div>

        <div className="btn-wrapper-sec">
            <div className="buttons-sec">
                <span className="ribbon-sec">IF NEEDED</span>
                <span className="ribbon-sec-sec"><input type="button" name="clear" value="Clear Local Storage" onClick={() => localStorage.clear()} /></span>;
            </div>
        </div>

    </div>
}

export default F1Welcome;