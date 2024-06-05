// ErrorPage.js
import React from 'react';

const ErrorPage = ({ error, year, constructorID, driverID, circuitID  }) => {
  return (
    <div>
      <h1>Oops! Something went wrong.</h1>
      <p>Error details: {error.message}</p>
      <p>Year is: {year !== undefined ? year : 'undefined'}</p>
      <p>Constructor ID is: {constructorID !== undefined ? constructorID : 'undefined'}</p>
      <p>Driver ID is: {driverID !== undefined ? driverID : 'undefined'}</p>
      <p>Circuit ID is: {circuitID !== undefined ? circuitID : 'undefined'}</p>
      {/* You can add additional content or styling here */}
    </div>
  );
};

export default ErrorPage;
