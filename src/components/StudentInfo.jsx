import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';

function StudentInfo() {
  const location = useLocation();
  const formData = location.state.formData;
  const navigate = useNavigate();

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

  let grandTotalMarks = 0;
  let grandMaxMarks = 0;

  const semesterInfo = formData.semesterData.map((semester, semesterIndex) => {
    const { totalMarks, maxMarks, percentage, grade } = calculateSemesterStats(semester);
    grandTotalMarks += totalMarks;
    grandMaxMarks += maxMarks;

    return { totalMarks, maxMarks, percentage, grade };
  });

  let grandPercentage = (grandTotalMarks / grandMaxMarks) * 100;
  let grandGrade = calculateGrade(grandPercentage);

  return (
    <div>
      <Header></Header>
      <div style={{ margin: '0 10% 5% 10%' }}>
        <h1 style={{ textAlign: 'center', fontSize: '2.5em' }}>Student Information</h1>
        <div style={{ display: 'flex', gap: '20%' }}>
          <div>
            <p><b>Name:</b> {formData.name}</p>
            <p><b>Course:</b> {formData.course}</p>
            <p><b>Register No:</b> {formData.regno}</p>
          </div>
          <div>
            <p><b>Total Semesters:</b> {formData.tsem}</p>
            <p><b>Current Semester:</b> {formData.csem}</p>
          </div>
        </div>
        {formData.semesterData.map((semester, semesterIndex) => {
          const { totalMarks, maxMarks, percentage, grade } = semesterInfo[semesterIndex];

          return (
            <div key={semesterIndex}>
              <h2>Semester {semesterIndex + 1}</h2>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell><b>Subject</b></TableCell>
                      <TableCell><b>Maximum Marks</b></TableCell>
                      <TableCell><b>Marks Scored</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {semester.map((subject, subjectIndex) => (
                      <TableRow key={subjectIndex}>
                        <TableCell>{subject['subject']}</TableCell>
                        <TableCell>{subject['max']}</TableCell>
                        <TableCell>{subject['marks']}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <div style={{ display: 'flex', gap: '16%' }}>
                <p><b>Total Marks:</b> {totalMarks}</p>
                <p><b>Maximum Marks:</b> {maxMarks}</p>
                <p><b>Percentage:</b> {percentage.toFixed(2)}%</p>
                <p><b>Grade:</b> {grade}</p>
              </div>
            </div>
          );
        })}
        {formData.semesterData.length > 1 && (
          <div>
            <h2>Grand Total</h2>
            <div style={{ display: 'flex', gap: '50%' }}>
              <div>
                <p><b>Total Marks:</b> {grandTotalMarks}</p>
                <p><b>Maximum Marks:</b> {grandMaxMarks}</p>
              </div>
              <div>
                <p><b>Percentage:</b> {grandPercentage.toFixed(2)}%</p>
                <p><b>Grade:</b> {grandGrade}</p>
              </div>
            </div>
          </div>
        )}
        <div style={{ textAlign: 'center', marginTop: '5%' }}>
\          <Button variant="contained" onClick={() => navigate('/')}>Back</Button>
        </div>
      </div>
    </div>
  );
}

export default StudentInfo;
