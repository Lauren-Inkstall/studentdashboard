import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Login from './pages/Login';
import Planning from './pages/Planning';
import Dashboard from './pages/Dashboard';
import Analysis from './pages/Analysis';
import Assignments from './pages/Assignments';
import PaperLog from './pages/PaperLog';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/paper-log" element={<PaperLog />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/planning" element={<Planning />} />
        <Route path="/assignments" element={<Assignments />} />
      </Routes>
    </Router>
  );
}

export default App
