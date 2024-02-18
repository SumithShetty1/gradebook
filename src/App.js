import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AddStudent from './components/AddStudent';
import './components/Home.css';
import './App.css';
import ViewStudent from './components/ViewStudent';
import StudentInfo from './components/StudentInfo';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/add" element={<AddStudent />} />
          <Route exact path="/view" element={<ViewStudent />} />
          <Route exact path="/studentinfo" element={<StudentInfo/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;