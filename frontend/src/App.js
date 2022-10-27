import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import LandingPage from './pages/LandingPage'
import PasswordResetPage from './pages/PasswordResetPage'
import VerifyPage from './pages/VerifyPage'
import PasswordResetPage2 from './pages/PasswordResetPage2'
import VerifyFailedPage from './pages/VerifyFailedPage'
import VerifySuccessfulPage from './pages/VerifySuccessfulPage'

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />}/>
      <Route path="/landing" element={<LandingPage />}/>
      <Route path="/verification-successful" element={<VerifySuccessfulPage />}/>
      <Route path="/verification-failed" element={<VerifyFailedPage />}/>
      <Route path="/resetpage" element={<PasswordResetPage />}/>
      <Route path="/verifyAccount/:userID/:uniqueEmailToken" element={<VerifyPage />}/>
      <Route path="/resetPassword/:userID/:passwordResetToken" element={<PasswordResetPage2 />}/>
    </Routes>
  </BrowserRouter>
);
}

export default App
