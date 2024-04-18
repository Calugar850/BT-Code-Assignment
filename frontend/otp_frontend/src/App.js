import logo from './logo.svg';
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GenerateOTP from './GenerateOTP';
import ValidateOTP from './ValidateOTP';

function App() {
  return (
      <Router>
        <Routes>
          <Route exact path="/" element={<GenerateOTP/>}/>
          <Route path='/validateOTP' exact={true} element={<ValidateOTP/>}/>
        </Routes>
      </Router>
  );
}

export default App;
