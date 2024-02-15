import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function AddStudent() {
    const [formData, setFormData] = useState({
        name: '',
        course: '',
        regno: '',
        tsem: '',
        csem: '',
        semesterData: [],
    });

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
        updatedSemesterData[semesterIndex] = updatedSemesterData[semesterIndex]
            ? [...updatedSemesterData[semesterIndex], { subject: '', marks: '', maxMarks: '' }]
            : [{ subject: '', marks: '', maxMarks: '' }];
        setFormData({ ...formData, semesterData: updatedSemesterData });
    };

    const handleSubjectChange = (semesterIndex, subjectIndex) => (e) => {
        const updatedSemesterData = [...formData.semesterData];
        console.log(updatedSemesterData[semesterIndex])
        console.log(updatedSemesterData[semesterIndex][subjectIndex])
        updatedSemesterData[semesterIndex][subjectIndex][e.target.name.slice(-1)] = e.target.value;
        setFormData({ ...formData, semesterData: updatedSemesterData });
    };

    const calculateSemesterStats = (semesterData) => {
        const totalMarks = semesterData.reduce((total, subject) => total + parseInt(subject.marks || 0), 0);
        const maxMarks = semesterData.reduce((total, subject) => total + parseInt(subject.maxMarks || 0), 0);
        const percentage = maxMarks === 0 ? 0 : (totalMarks / maxMarks) * 100;
        const grade = calculateGrade(percentage);
        return { totalMarks, percentage, grade };
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
            const semesterData = formData.semesterData[i] || [];
            const { totalMarks, percentage, grade } = calculateSemesterStats(semesterData);
            const subjectFields = semesterData.map((subject, subjectIndex) => (
                <div key={subjectIndex}>
                    <TextField
                        name={`semester${i + 1}Subject${subjectIndex + 1}`}
                        label={`Subject ${subjectIndex + 1}`}
                        variant="outlined"
                        onChange={handleSubjectChange(i, subjectIndex)}
                        required
                    />
                    <TextField
                        name={`semester${i + 1}MaxMarks${subjectIndex + 1}`}
                        label="Maximum Marks"
                        type="number"
                        variant="outlined"
                        onChange={handleSubjectChange(i, subjectIndex)}
                        required
                    />
                    <TextField
                        name={`semester${i + 1}Marks${subjectIndex + 1}`}
                        label="Marks Scored"
                        type="number"
                        variant="outlined"
                        onChange={handleSubjectChange(i, subjectIndex)}
                        required
                    />
                </div>
            ));

            fields.push(
                <div key={i}>
                    <h3>Semester {i + 1}</h3>
                    {subjectFields}
                    <Button variant="contained" onClick={() => handleAddSubject(i)}>Add Subject</Button>
                    <p>Total Marks: {totalMarks}</p>
                    <p>Percentage: {percentage.toFixed(2)}%</p>
                    <p>Grade: {grade}</p>
                </div>
            );
        }

        return fields;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newData = [...data, formData];
        setData(newData);
        localStorage.setItem('Student', JSON.stringify(newData));
    };


    return (
        <div>
            <h2>Add New Student Details</h2>
            <form onSubmit={handleSubmit}>
                {/* Basic student details */}
                <TextField name="name" label="Name" variant="outlined" value={formData.name} onChange={handleChange} required />
                <TextField name="course" label="Course" variant="outlined" value={formData.course} onChange={handleChange} required />
                <TextField name="regno" label="Register No" variant="outlined" value={formData.regno} onChange={handleChange} required />
                <TextField name="tsem" label="Total Semesters" type="number" variant="outlined" value={formData.tsem} onChange={handleChange} required />
                <TextField name="csem" label="Current Semester" type="number" variant="outlined" value={formData.csem} onChange={handleChange} required />

                {/* Semester-wise subject input fields */}
                {renderFields()}

                {/* Submit button */}
                <Button type="submit" variant="contained">Submit</Button>
            </form>
        </div>
    );
}

export default AddStudent;
