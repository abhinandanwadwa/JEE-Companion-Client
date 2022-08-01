import React from 'react'
import './App.css';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from './components/DashBoard';
import Signup from './components/Signup';
import Challenge from './components/Challenge';
import Practice from './components/Practice';
import { useEffect } from 'react';
import ChallengePage from './components/ChallengePage';
import Mychallanges from './components/Mychallanges';
import MyProfile from './components/MyProfile';
import Test from './components/Test';

function App() {
  useEffect(() => {
    document.body.style.backgroundColor = 'black';
  }, [])
  
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<DashBoard />} />
        <Route exact path="/challenge" element={<Challenge />} />
        <Route exact path="/challenge/:id" element={<ChallengePage />} />
        <Route exact path="/practice" element={<Practice />} />
        <Route exact path="/mychallenges" element={<Mychallanges />} />
        <Route exact path="/myprofile" element={<MyProfile />} />
        <Route exact path="/test/:myid/:hisid/:challengeid" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
