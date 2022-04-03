import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import { ThemeProvider } from '@emotion/react';
import DefaultTheme from 'Themes/defaultTheme';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from 'providers/AuthProvider';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <ThemeProvider theme={DefaultTheme}>
          <App />
          <CssBaseline />
        </ThemeProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
