import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CompanyForm from './components/CompanyForm';
import Dashboard from './components/Dashboard';
import { SnackbarProvider } from 'notistack';
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: '#e53935',
    },
    background: {
      default: '#fff',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider transitionDuration={{enter:300, exit:500}}>
      <CssBaseline />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<CompanyForm />} />
          <Route path="/home" element={<CompanyForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
