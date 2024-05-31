// TopQualifyingTime.js (create a new file)
import React from 'react';

// const convertTimeToMilliseconds = timeString => {
//     // Assuming the time format is "mm:ss.SSS"
//     const [minutes, seconds, milliseconds] = timeString.split(':').map(parseFloat);
//     return minutes * 60 * 1000 + seconds * 1000 + milliseconds;
//   };

//   const TopQualifyingTime = ({ Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9 }) => {
//     console.log("Q1=" + Q1 + "Q2=" + Q2 + "Q3" + Q3 + "Q4=" + Q4 + "Q5=" + Q5 + "Q6" + Q6 + "Q7=" + Q7 + "Q8=" + Q8 + "Q9" + Q9)
//   // Find the minimum time among Q1, Q2, and Q3
//   const topTime = [Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9].filter(time => typeof time === 'string').sort()[0];

//   console.log('Top Time:', topTime); // For debugging

//   return (
//     <span className="driver-time">
//       Top Time: {topTime || 'N/A'}
//     </span>
//   );
// };

const convertTimeToMilliseconds = timeString => {
  // Assuming the time format is "mm:ss.SSS"
  const [minutes, seconds, milliseconds] = timeString.split(':').map(parseFloat);
  return minutes * 60 * 1000 + seconds * 1000 + milliseconds;
};

const TopQualifyingTime = ({ qualifyingTimes }) => {
  const validTimes = qualifyingTimes.filter(time => typeof time === 'string');
  const bestTime = validTimes.length > 0 ? validTimes.sort()[0] : null;

  return (
    <span className="driver-time">
      Top Time: {bestTime || 'N/A'}
    </span>
  );
};

export default TopQualifyingTime;
