import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import QuestionBox from './pages/mbti/question'
import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/home/Home';
import NavBar from './components/NavBar';
import Mbti from './pages/mbti/Mbti';
import Results from './components/Results'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>

      <NavBar/>
        <Routes>
          <Route index element={<Home/>} />
          <Route path="/mbti" element={<Mbti/>} />
          <Route path="/results" element={<Results personalityData={{
        "Explanation": "High extroversion (5) leads to a preference for growth and risky assets such as stocks and crypto. Low sensing (1) suggests a focus on innovation and future potential over current stability. Moderate thinking (3) balances logic with some emotional factors. Judging (4) indicates a preference for structured, long-term planning.",
        "RiskProfile": "Moderate-High Risk | Opportunistic & Growth-Oriented",
         "Allocation": {
            "Growth Stocks": [35, ["NVIDIA (NVDA)", "Tesla (TSLA)", "Shopify (SHOP)", "Palantir (PLTR)"]],
            "Cryptocurrency": [25, ["Ethereum (ETH)", "Solana (SOL)", "Chainlink (LINK)", "Avalanche (AVAX)"]],
            "Real Estate": [15, ["Fundrise (fractional real estate)", "Realty Income (O)"]],
            "Bonds": [10, ["U.S. Treasury Bonds", "Apple Corporate Bonds (AAPL)"]],
            "Small Businesses": [10, ["Startups via crowdfunding (AngelList, Kickstarter)"]],
            "Cash": [5, ["High-yield savings (Ally, Marcus by Goldman Sachs)"]]
        }
          }}/>}/>
        </Routes>

    </BrowserRouter>
  )
}

export default App
