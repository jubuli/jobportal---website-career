
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material'; 
import { useDispatch } from 'react-redux';
import { initializeJobs } from './store/jobSlice';
import Header from './components/Layout/Header';
import JobList from './pages/JobList';
import JobDetails from './pages/JobDetails';
import AddJob from './pages/AddJob';
import Footer from './components/Footer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    }
  },
});

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
  
    dispatch(initializeJobs());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<JobList />} />
              <Route path="/job/:id" element={<JobDetails />} />
              <Route path="/add-job" element={<AddJob />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;