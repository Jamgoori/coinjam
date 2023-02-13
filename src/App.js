import Navbar from './components/Navbar'
import React, { useEffect, useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Account from './pages/Account'
import Coinpage from './pages/Coinpage'
import axios from 'axios'
import Footer from './components/Footer'
import { AuthContextProvider } from './context/AuthContext'
function App() {
  const [coins, setCoins] = useState([])
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=krw&order=market_cap_desc&per_page=20&page=1&sparkline=true`

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setCoins(response.data)
        console.log(response.data)
      })
      .catch(() => {
        alert('코인게코의 서버가 불안정합니다.')
      })
  }, [url])

  return (
    <ThemeProvider>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home coins={coins} />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account" element={<Account />} />
          <Route path="/coin/:coinId" element={<Coinpage />}>
            <Route path=":coinId" />
          </Route>
        </Routes>
        <Footer />
      </AuthContextProvider>
    </ThemeProvider>
  )
}

export default App
