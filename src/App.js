import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AddStudent from './components/AddStudent';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/add" element={<AddStudent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;