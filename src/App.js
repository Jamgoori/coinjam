import Navbar from './components/template/Navbar'
import React, { useEffect, useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Account from './pages/Account'
import Coinpage from './pages/Coinpage'
import Footer from './components/template/Footer'
import { AuthContextProvider } from './context/AuthContext'
import { getCoins } from './queries/getCoins'

function App() {
  const [coins, setCoins] = useState([])

  useEffect(() => {
    getCoins()
      .then((response) => {
        setCoins(response.data)
        console.log(response.data)
      })
      .catch(() => {
        alert('코인게코의 서버가 불안정합니다.')
      })
  }, [])

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
