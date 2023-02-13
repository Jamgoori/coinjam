import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import EmailInput from '../components/molecules/EmailInput'
import PasswordInput from '../components/molecules/PasswordInput'

const Signin = () => {
  const { signIn } = UserAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await signIn(email, password)
      navigate('/account')
    } catch (e) {
      setError(e.message)
      console.log(e.message)
    }
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
          <Link to="/signup" className="text-accent">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signin
