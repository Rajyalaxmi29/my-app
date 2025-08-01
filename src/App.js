// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import BusinessFormPage from './components/business-form/BusinessFormPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<BusinessFormPage />} />
      </Routes>
    </Router>
  );
}

export default App;