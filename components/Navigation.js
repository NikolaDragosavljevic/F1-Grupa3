// Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/drivers">Drivers</Link>
        </li>
        <li>
          <Link to="/teams">Teams</Link>
        </li>
        <li>
          <Link to="/races">Races</Link>
        </li>
        <li>
          <Link to="/">Start Page</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
