import React from 'react'
import logo from '../logo.svg'
import '../styles/Home.css';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            {/* Link to home */}
            <Link to="/">
                <img src={logo} alt="logo" width={90} />
            </Link>
            <nav>
                <ul>
                    <li>
                        <Link to='/add'>Add New Student Details</Link>
                    </li>
                    <li>
                        <Link to='/view'>View Existing Student Records</Link>
                    </li>
                    <li>
                        <Link to='/update'>Edit Student Records</Link>
                    </li>
                    <li>
                        <Link to='/delete'>Delete Student Records</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header