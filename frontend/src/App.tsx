import { useState } from 'react'
import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/home/Home';
import NavBar from './components/NavBar';
import Mbti from './pages/mbti/Mbti';
import Results from './pages/results/Results';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mbti" element={<Mbti />} />
        <Route path="/results" element={<Results />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
