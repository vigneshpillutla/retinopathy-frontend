import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { ThemeProvider } from '@emotion/react';
import DefaultTheme from 'Themes/defaultTheme';
import { CssBaseline } from '@mui/material';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDSqcsUjy2F3XK78ftjgmQUASYNOVvIvxg',
  authDomain: 'diabeticretinopathy-5c6f0.firebaseapp.com',
  projectId: 'diabeticretinopathy-5c6f0',
  storageBucket: 'diabeticretinopathy-5c6f0.appspot.com',
  messagingSenderId: '214344058419',
  appId: '1:214344058419:web:4845b3964d92de62198546',
  measurementId: 'G-1BDB7Q43CK'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={DefaultTheme}>
        <App />
        <CssBaseline />
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);
