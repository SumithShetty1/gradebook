import React from 'react';
import '../styles/Home.css';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
// import Grid from '@mui/material/Grid';
// import Container from '@mui/material/Container';
import { createSvgIcon } from '@mui/material/utils';
import { FaUserPlus} from "react-icons/fa6";
import { FaUserEdit, FaUserTimes } from "react-icons/fa";
import { RiUserSearchFill } from "react-icons/ri";



function Home() {

  const PlusIcon = createSvgIcon(
  // credit: plus icon from https://heroicons.com/
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>,
  'Plus',
);

  return (
    <div style={{ textAlign: 'center'}}>
      <main className='title'><h1>Welcome to Student GradeBook</h1></main>
      <div className='btns-field'>
        <div style={{display:'flex', flexDirection:'column', gap:'20px'}}>
        <Button className='btn' component={Link} to='/add' variant='contained'><FaUserPlus className='icns'/> <div style={{width:'75%'}}>Add New Student Details</div></Button>
        <Button className='btn' component={Link} to='/view' variant='contained'><RiUserSearchFill className='icns' /> <div style={{width:'78%'}}>View Existing Student Records</div></Button>
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:'20px'}}>
        <Button className='btn' component={Link} to='/update' variant='contained'><FaUserEdit className='icns' /><div style={{width:'75%'}}>Edit Student Records</div></Button>
        <Button className='btn' component={Link} to='/delete' variant='contained'><FaUserTimes className='icns' /><div style={{width:'75%'}}>Delete Student Records</div></Button>
        </div>
      </div>
    </div>
  );
}

export default Home;