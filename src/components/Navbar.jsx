import React, { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <div className="rounded-div flex items-center justify-between h-20 font-bold duration-300">
      <Link to="/">
        <h1 className="text-2xl">코인잼</h1>
      </Link>
      <div className="hidden md:block">
        <ThemeToggle />
      </div>
      <div className="hidden md:block">
        <Link to="/signin" className="p-4 hover:text-accent">
          로그인
        </Link>
        <Link
          to="/signup"
          className="bg-button text-btnText px-5 py-2 ml-2 rounded-2xl shadow-lg hover:shadow-2xl"
        >
          회원가입
        </Link>
      </div>
      {/* 모바일 메뉴 */}
      <div onClick={handleNav} className="block md:hidden cursor-pointer z-10">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <div
        className={
          nav
            ? "md:hidden fixed left-0 top-20 flex flex-col items-center justify-center justify-between w-full h-[90%] bg-primary ease-in z-10"
            : "fixed left-[-100%] top-20 h-[90%] flex flex-col items-center justify-between ease-in"
        }
      >
        <ul className="w-full p-4">
          <li className="border-b py-6">
            <Link to="/">홈페이지</Link>
          </li>
          <li className="border-b py-6">
            <Link to="/">계정</Link>
          </li>
          <li className="border-b py-6">
            <ThemeToggle />
          </li>
        </ul>
        <div className="flex flex-col w-full p-4">
          <Link to="/signin">
            <button className="w-full my-2 p-3 bg-primary text-primary border border-secondary rounded-2xl shadow-xl">
              로그인
            </button>
          </Link>
          <Link to="/signup">
            <button>회원가입</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
