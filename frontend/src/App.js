import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Login from './components/login.component'
import SignUp from './components/signup.component'
import logo from './images/logo.png';

function App() {
  return (
    <Router>
      <div className="App">
        <nav class="border-b border-gray-300 py-6">
          <p class="font-bold flex items-center justify-center">
            <i class="fab fa-spotify mr-2 text-6xl"></i>
            <img select draggable="false" class="mt-2 -mb-5" style={{ width: 300}} src={logo} alt="Trendify"></img>
          </p>
        </nav>

        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
