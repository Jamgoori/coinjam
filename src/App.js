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
import { getCoins } from './queries/getCoins'
import { useDispatch } from 'react-redux'
import { login, logout } from './store/authStore'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'

function App() {
  const dispatch = useDispatch()
  const [coins, setCoins] = useState([])

  // page load 때 user 체크
  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // 유저가 존재하면 login dispatch
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
          })
        )
      } else {
        dispatch(logout())
      }
    })
  }, [])

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
    </ThemeProvider>
  )
}
export default App
