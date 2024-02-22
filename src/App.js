import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import './App.css';
import AddStudent from './components/AddStudent';
import ViewStudent from './components/ViewStudent';
import StudentInfo from './components/StudentInfo';
import DeleteStudent from './components/DeleteStudent';
import UpdateStudent from './components/UpdateStudent';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/add" element={<AddStudent />} />
          <Route exact path="/view" element={<ViewStudent />} />
          <Route exact path="/update" element={<UpdateStudent />} />
          <Route exact path="/delete" element={<DeleteStudent/>} />
          <Route exact path="/studentinfo" element={<StudentInfo/>} />
        </Routes>
      </BrowserRouter>
      <footer>
        <p className='phone'>+91 7612345678</p>
        <p className='copyright'>© 2024 Student GradeBook. All rights reserved.</p>
        <p className='gmail'>gradebook@gmail.com</p>
      </footer>
    </div>
  );
}

export default App;