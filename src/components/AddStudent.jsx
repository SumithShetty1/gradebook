import React, { useState, useEffect } from 'react';
import '../styles/AddStudent.css';
import { useNavigate, useLocation } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Header from './Header';

function AddStudent() {
    const location = useLocation();
    const navigate = useNavigate();

    const initialFormData = location.state ? location.state.formData : {
        name: '',
        course: '',
        regno: '',
        tsem: '',
        csem: '1',
        semesterData: [],
    };

    const [formData, setFormData] = useState(initialFormData);
    const [data, setData] = useState([]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('Student'));
        if (storedData) {
            setData(storedData);
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddSubject = (semesterIndex) => {
        const updatedSemesterData = [...formData.semesterData];
        const newSubject = { subject: '', max: '', marks: '' };
        updatedSemesterData[semesterIndex] = updatedSemesterData[semesterIndex]
            ? updatedSemesterData[semesterIndex].concat(newSubject)
            : [newSubject];
        setFormData({ ...formData, semesterData: updatedSemesterData });
    };

    const handleRemoveSubject = (semesterIndex, subjectIndex) => {
        const updatedSemesterData = [...formData.semesterData];
        if (!updatedSemesterData[semesterIndex] || updatedSemesterData[semesterIndex].length === 0) {
            alert('No subjects to remove');
        } else if (updatedSemesterData[semesterIndex].length === 1) {
            alert('Cannot remove the only subject in the semester');
        } else {
            updatedSemesterData[semesterIndex].splice(subjectIndex, 1);
            setFormData({ ...formData, semesterData: updatedSemesterData });
        }
    };

    const handleSubjectChange = (semesterIndex, subjectIndex) => (e) => {
        const updatedSemesterData = [...formData.semesterData];
        updatedSemesterData[semesterIndex] = updatedSemesterData[semesterIndex] || [];
        updatedSemesterData[semesterIndex][subjectIndex] = updatedSemesterData[semesterIndex][subjectIndex] || {};
        updatedSemesterData[semesterIndex][subjectIndex][e.target.name] = e.target.value;
        setFormData({ ...formData, semesterData: updatedSemesterData });
    };

    const calculateSemesterStats = (semesterData) => {
        let totalMarks = 0;
        let maxMarks = 0;
        for (const sem of semesterData) {
            totalMarks += parseInt(sem.marks || 0);
            maxMarks += parseInt(sem.max || 0);
        }

        const percentage = maxMarks === 0 ? 0 : (totalMarks / maxMarks) * 100;
        const grade = calculateGrade(percentage);
        return { totalMarks, maxMarks, percentage, grade };
    };

    const calculateGrade = (percentage) => {
        if (percentage >= 90) return 'A+';
        if (percentage >= 80) return 'A';
        if (percentage >= 70) return 'B+';
        if (percentage >= 60) return 'B';
        if (percentage >= 50) return 'C';
        if (percentage >= 40) return 'D';
        return 'F';
    };

    const renderFields = () => {
        const semesterCount = parseInt(formData.csem);
        const fields = [];

        for (let i = 0; i < semesterCount; i++) {
            const semesterData = formData.semesterData[i] || [{ subject: '', max: '', marks: '' }];
            const { totalMarks, maxMarks, percentage, grade } = calculateSemesterStats(semesterData);
            const subjectFields = semesterData.map((subject, subjectIndex) => (
                <div className='subject' key={subjectIndex}>
                    <TextField
                        name="subject"
                        label="Subject"
                        variant="outlined"
                        value={subject.subject}
                        onChange={handleSubjectChange(i, subjectIndex)}
                        required
                    />
                    <TextField
                        name="max"
                        label="Maximum Marks"
                        type="number"
                        variant="outlined"
                        value={subject.max}
                        onChange={handleSubjectChange(i, subjectIndex)}
                        required
                    />
                    <TextField
                        name="marks"
                        label="Marks Scored"
                        type="number"
                        variant="outlined"
                        value={subject.marks}
                        onChange={handleSubjectChange(i, subjectIndex)}
                        required
                    />
                    <Button variant="contained" color="error" onClick={() => handleRemoveSubject(i, subjectIndex)}>Remove</Button>
                </div>
            ));

            fields.push(
                <div key={i}>
                    <h2 className='App'>Semester {i + 1}</h2>
                    {subjectFields}
                    <div style={{ display: 'flex' }}>
                        <div>
                            <Button variant="contained" onClick={() => handleAddSubject(i)}>Add Subject</Button>
                        </div>
                    </div>
                    <p><b>Total Marks:</b> {totalMarks}</p>
                    <p><b>Maximum Marks:</b> {maxMarks}</p>
                    <p><b>Percentage:</b> {percentage.toFixed(2)}%</p>
                    <p><b>Grade:</b> {grade}</p>
                </div>
            );
        }

        return fields;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.csem === '0') {
            alert('Current Semester cannot be 0');
            return;
        }

        if (parseInt(formData.csem) > parseInt(formData.tsem)) {
            alert('Current Semester cannot be greater than Total Semester');
            return;
        }

        let isDuplicate = false;
        for (const item of data) {
            if (item.regno === formData.regno && item.course === formData.course) {
                isDuplicate = true;
                break;
            }
        }

        if (isDuplicate) {
            alert('Student with the same register number and course already exists!');
        } else {
            for (const semesterData of formData.semesterData) {
                for (const subject of semesterData) {
                    const marksScored = parseInt(subject.marks) || 0;
                    const maxMarks = parseInt(subject.max) || 0;
                    if (marksScored > maxMarks) {
                        alert('Marks Scored cannot be greater than Maximum Marks');
                        return;
                    }
                }
            }

            if (location.state) {
                const updatedData = data.map(item => {
                    if (item.regno === formData.regno && item.course === formData.course) {
                        return formData;
                    }
                    return item;
                });
                setData(updatedData);
                localStorage.setItem('Student', JSON.stringify(updatedData));
            } else {
                const newData = [...data, formData];
                setData(newData);
                localStorage.setItem('Student', JSON.stringify(newData));
            }
            navigate('/studentinfo', { state: { formData: formData } });
        }
    };

    return (
        <div>
            <Header />
            <h1 className='App'>Add New Student Details</h1>
            <form onSubmit={handleSubmit}>
                {/* Basic student details */}
                <div style={{ display: 'flex', gap: '25%', marginBottom: '15px' }}>
                    <TextField className="input-field" name="name" label="Name" variant="outlined" value={formData.name} onChange={handleChange} required />
                    <TextField className="input-field" name="regno" label="Register No" variant="outlined" value={formData.regno} onChange={handleChange} required />
                </div>
                <div style={{ display: 'flex', gap: '25%', marginBottom: '15px' }}>
                <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                        <InputLabel id="course-label">Course</InputLabel>
                        <Select
                            className="input-field"
                            labelId="course-label"
                            name="course"
                            value={formData.course}
                            onChange={handleChange}
                            label="Course"
                            required
                        >
                            <MenuItem value="">Select Course</MenuItem>
                            <MenuItem value="Bachelor's in Computer Applications">Bachelor's in Computer Applications</MenuItem>
                            <MenuItem value="Bachelor's in Computer Science">Bachelor's in Computer Science</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField className="input-field" name="tsem" label="Total Semesters" type="number" variant="outlined" value={formData.tsem} onChange={handleChange} required />
                </div>
                <div style={{ marginBottom: '15px' }}>
                <TextField className="input-field" name="csem" label="Current Semester" type="number" variant="outlined" value={formData.csem} onChange={handleChange} required />
                </div>

                {/* Semester-wise subject input fields */}
                {renderFields()}

                {/* Submit button */}
                <Button style={{margin:'15px 0 35px 0'}} type="submit" variant="contained">Submit</Button>
            </form>
        </div>
    );
}

export default AddStudent;
