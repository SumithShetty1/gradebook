import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to Student GradeBook</h1>
      <ul>
        <li><Link to="/add">Add New Student Details</Link></li>
        <li><Link to="/view">View Existing Student Records</Link></li>
        <li><Link to="/edit">Edit Student Records</Link></li>
        <li><Link to="/report">Generate Reports</Link></li>
      </ul>
    </div>
  );
}

export default Home;