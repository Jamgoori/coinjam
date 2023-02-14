import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ThemeToggle from '../atom/ThemeToggle'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectUser } from '../../store/authStore'
import { auth } from '../../firebase'

const Navbar = () => {
  const [nav, setNav] = useState(false)
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleNav = () => {
    setNav(!nav)
  }
  const handleSignOut = async () => {
    try {
      dispatch(logout())
      await auth.signOut()
      navigate('/')
    } catch (e) {
      console.log(e.message)
    }
  }
  return (
    <div className="flex items-center justify-between h-20 font-bold duration-300 rounded-div">
      <Link to="/">
        <h1 className="text-2xl">코인잼💸</h1>
      </Link>
      <div className="hidden md:block">
        <ThemeToggle />
      </div>
      {user?.email ? (
        <div>
          <Link to="/account" className="p-4">
            내 정보
          </Link>
          <button onClick={handleSignOut}>로그아웃</button>
        </div>
      ) : (
        <div className="hidden md:block">
          <Link to="/signin" className="p-4 hover:text-accent">
            로그인
          </Link>
          <Link to="/signup" className="px-5 py-2 ml-2 shadow-lg bg-button text-btnText rounded-2xl hover:shadow-2xl">
            회원가입
          </Link>
        </div>
      )}
      {/* 모바일 메뉴 */}
      <div onClick={handleNav} className="z-10 block cursor-pointer md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <div
        className={
          nav
            ? 'md:hidden fixed left-0 top-20 flex flex-col items-center justify-center justify-between w-full h-[90%] bg-primary ease-in z-10'
            : 'fixed left-[-100%] top-20 h-[90%] flex flex-col items-center justify-between ease-in'
        }
      >
        <ul className="w-full p-4">
          <li onClick={handleNav} className="py-6 border-b">
            <Link to="/">홈페이지</Link>
          </li>
          <li onClick={handleNav} className="py-6 border-b">
            <Link to="/account">계정</Link>
          </li>
          <li className="py-6 border-b">
            <ThemeToggle />
          </li>
        </ul>
        <div className="flex flex-col w-full p-4">
          <Link to="/signin">
            <button
              onClick={handleNav}
              className="w-full p-3 my-2 border shadow-xl bg-primary text-primary border-secondary rounded-2xl"
            >
              로그인
            </button>
          </Link>
          <Link onClick={handleNav} to="/signup">
            <button>회원가입</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default Navbar
