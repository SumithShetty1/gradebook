import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

function Home() {
  return (
    <div className='Home'>
      <nav className='title'><h1>Welcome to Student GradeBook</h1></nav>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{alignItems:'center'}}>
          <Grid item xs={6}>
            <Container className='grid-container' maxWidth="sm">
              <Button className='btn' component={Link} to='/add' variant='contained'>Add New Student Details</Button>
            </Container>
          </Grid>
          <Grid item xs={6}>
            <Container className='grid-container' maxWidth="sm">
              <Button className='btn' component={Link} to='/view' variant='contained'>View Existing Student Records</Button>
            </Container>
          </Grid>
          <Grid item xs={6}>
            <Container className='grid-container' maxWidth="sm">
              <Button className='btn' component={Link} to='/edit' variant='contained'>Edit Student Records</Button>
            </Container>
          </Grid>
          <Grid item xs={6}>
            <Container className='grid-container' maxWidth="sm">
              <Button className='btn' component={Link} to='/report' variant='contained'>Generate Reports</Button>
            </Container>
          </Grid>
        </Grid>
    </div>
  );
}

export default Home;