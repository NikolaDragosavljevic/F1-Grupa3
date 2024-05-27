import React from 'react';

export default function ChampStandings(props) {



    return (
        <>
            <h1>F1 Drivers Champions</h1>;
            <ul>
                {props.drivers.map(driver => 
                <li key={driver.Driver.driverId}> {driver.position} {driver.Driver.givenName} {driver.Driver.familyName} {driver.Constructors[0].name} </li>)}
            </ul>
        </>
    );


}