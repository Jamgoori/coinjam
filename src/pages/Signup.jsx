import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import EmailInput from '../components/molecules/EmailInput'
import PasswordInput from '../components/molecules/PasswordInput'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase'
import { useDispatch } from 'react-redux'
import { login } from '../store/authStore'
import { doc, setDoc } from 'firebase/firestore'

const Signup = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    createUserWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        setDoc(doc(db, 'users', email), {
          watchList: [],
        })
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
          })
        )
        navigate('/')
      })
      .catch((err) => {
        alert(err)
      })
  }
  return (
    <div>
      <div className="max-w-[400px] mx-auto min-h-[600px] px-4 py-20">
        <h1 className="text-2xl font-bold">회원가입</h1>
        {error ? <p className="p-3 my-2 bg-red-300">{error}</p> : null}
        <form onSubmit={handleSubmit}>
          <EmailInput onChange={(e) => setEmail(e.target.value)} />
          <PasswordInput onChange={(e) => setPassword(e.target.value)} />
          <button className="w-full p-3 my-2 shadow-xl bg-button text-btnText rounded-2xl">회원가입</button>
        </form>
        <p className="my-4">
          이미 계정이 있으신가요?{' '}
          <Link to="/signin" className="text-accent">
            로그인
          </Link>
        </p>
      </div>
    </div>
  )
}
export default Signup
