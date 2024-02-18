import React, { useState, useEffect } from 'react'
import './Forms.css'
import { useNavigate } from "react-router-dom";

export default function ViewStudent() {

  const [course, setCourse] = useState('');
  const [regno, setRegno] = useState('');

  const [data, setData] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    const Alldata = JSON.parse(localStorage.getItem('Student'))
    setData(Alldata)
  }, [])

  console.log(data)

  const handleSubmit = (e) => {
    data.map(value => {
      console.log(value.name)
      if ((course === value.course && regno === value.regno)) {
        navigate('/studentinfo', { state: { course, regno } })
      } else {
        alert("Invalid course or Register Number")
      }
    })
  }

  return (
    <div className="App">
      <div className="form-div">
        <form onSubmit={handleSubmit}>
          <input className='form-input' type="text" placeholder='Enter Course' value={course} onChange={(e) => setCourse(e.target.value)} />
          <input className='form-input' type="text" placeholder='Enter Register Number' value={regno} onChange={(e) => setRegno(e.target.value)} />
          <button className='form-button' type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};
