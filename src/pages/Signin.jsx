import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import EmailInput from '../components/molecules/EmailInput'
import PasswordInput from '../components/molecules/PasswordInput'
import { useDispatch } from 'react-redux'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { login } from '../store/authStore'
import { PAGE_ROUTES } from '../constants/Routes'

const Signin = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    signInWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
          })
        )
        navigate('/account')
      })
      .catch((err) => {
        setError(err.message)
        alert(err)
      })
  }
  return (
    <div>
      <div className="max-w-[400px] mx-auto min-h-[600px] px-4 py-20">
        <h1 className="text-2xl font-bold">로그인</h1>
        <form onSubmit={handleSubmit}>
          <EmailInput onChange={(e) => setEmail(e.target.value)} />
          <PasswordInput onChange={(e) => setPassword(e.target.value)} />
          <button className="w-full p-3 my-2 shadow-xl bg-button text-btnText rounded-2xl">로그인</button>
        </form>
        <p className="my-4">
          계정이 없으신가요?{' '}
          <Link to={PAGE_ROUTES.SIGNUP} className="text-accent">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  )
}
export default Signin
