import React from 'react';
import '../styles/Home.css';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { FaUserPlus } from "react-icons/fa6";
import { FaUserEdit, FaUserTimes } from "react-icons/fa";
import { RiUserSearchFill } from "react-icons/ri";
import { IoIosArrowRoundForward } from "react-icons/io";
import logo from '../logo.jpg'

function Home() {

  return (
    <div style={{ textAlign: 'center' }}>
      <nav style={{ textAlign: 'left', marginLeft: '30px' }}>
        <Link to="/" style={{ display: 'flex', gap: '10px', textDecoration: 'none', color: 'black', fontWeight: 'bold', fontSize: '24px' }}>
          <img src={logo} alt="logo" width={70} />
          <span style={{ marginTop: '15px' }}>Student GradeBook</span>
        </Link>
      </nav>
      <div className='title'>
        <h1>Your Path to Academic Excellence!</h1>
        <h2>Free grade tracking</h2>
        <Button variant="outlined" color='success'>
          <a href="#sectionButtons" style={{ textDecoration: 'none', color: 'inherit' }}>Get Started</a>
          <IoIosArrowRoundForward className='icns' />
        </Button>
      </div>
      <div id='sectionButtons'>
        <h1>Manage Student Records</h1>
        <div className='btns-field'>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Button className='btn' component={Link} to='/add' variant='contained'><FaUserPlus className='icns' /> <div style={{ width: '75%' }}>Add New Student Details</div></Button>
            <Button className='btn' component={Link} to='/view' variant='contained'><RiUserSearchFill className='icns' /> <div style={{ width: '78%' }}>View Existing Student Records</div></Button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Button className='btn' component={Link} to='/update' variant='contained'><FaUserEdit className='icns' /><div style={{ width: '75%' }}>Edit Student Records</div></Button>
            <Button className='btn' component={Link} to='/delete' variant='contained'><FaUserTimes className='icns' /><div style={{ width: '75%' }}>Delete Student Records</div></Button>
          </div>
        </div>
      </div>
      <div className='about'>
        <h1>About Us</h1>
        <p>
          At Student GradeBook, we're dedicated to revolutionizing the way students manage and track their academic progress. Our platform is designed to empower learners of all levels to take control of their education, providing a user-friendly interface that simplifies the process of monitoring grades, assignments, and overall performance.
          With Student GradeBook, students can easily access their grades, track their progress over time, and identify areas for improvement. Whether you're aiming for straight A's or simply striving to stay organized, our intuitive features make it easier than ever to stay on top of your academic journey.
          Forget the stress of manual grade tracking or missing important deadlines. With Student GradeBook, you can streamline your academic life and focus on what truly matters: learning and achieving your goals. Join us today and unlock the potential for academic success!
        </p>
      </div>
    </div>
  );
}

export default Home;