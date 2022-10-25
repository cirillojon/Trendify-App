import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import LandingPage from './pages/LandingPage'
import VerifyPage from './pages/VerifyPage'

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />}/>
      <Route path="/landing" element={<LandingPage />}/>
      <Route path="/verifyAccount/:userID/:uniqueEmailToken" element={<VerifyPage />}/>
    </Routes>
  </BrowserRouter>
);
}

export default App
