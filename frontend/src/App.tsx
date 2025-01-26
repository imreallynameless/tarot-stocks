import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import QuestionBox from './mbti/question'
import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/home/Home';
import NavBar from './components/NavBar';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>

      <NavBar/>
        <Routes>
          <Route index element={<Home/>} />
          {/* <Route path="/MBTI" element={<MBTI />} /> */}
        </Routes>

      <QuestionBox question="How much do you like React?" />
    </BrowserRouter>
  )
}

export default App
