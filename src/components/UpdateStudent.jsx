import React, { useState, useEffect } from 'react';
import '../styles/Forms.css';
import { useNavigate } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Header from './Header';

export default function UpdateStudent() {
  const [course, setCourse] = useState('');
  const [regno, setRegno] = useState('');
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const allData = JSON.parse(localStorage.getItem('Student'));
    setData(allData);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredData = data.filter(item => item.course === course && item.regno === regno);
    if (filteredData.length > 0) {
      navigate('/add', { state: { formData: filteredData[0] } });
    } else {
      alert("Invalid course or Register Number");
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="form-div">
        <form onSubmit={handleSubmit}>
          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
            <InputLabel id="course-label">Course</InputLabel>
            <Select
              labelId="course-label"
              name="course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              label="Course"
              className='form-input'
              required
            >
              <MenuItem value="">Select Course</MenuItem>
              <MenuItem value="Bachelor's in Computer Applications">Bachelor's in Computer Applications</MenuItem>
              <MenuItem value="Bachelor's in Computer Science">Bachelor's in Computer Science</MenuItem>
            </Select>
          </FormControl>
          <TextField
            name="regno"
            label="Register No"
            variant="outlined"
            value={regno}
            onChange={(e) => setRegno(e.target.value)}
            className='form-input'
            required
          />
          <div className='div-btn'>
            <Button type="submit" className='form-button' variant="contained">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
