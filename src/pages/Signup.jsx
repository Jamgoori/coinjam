import React, { useState } from "react";
import { AiFillLock, AiOutlineMail } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signUp } = UserAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      navigate("/account");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };
  return (
    <div>
      <div className="max-w-[400px] mx-auto min-h-[600px] px-4 py-20">
        <h1 className="text-2xl font-bold">회원가입</h1>
        {error ? <p className="p-3 my-2 bg-red-300">{error}</p> : null}
        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <label>이메일</label>
            <div className="relative w-full my-2 shadow-xl rounded-2xl">
              <input
                className="w-full p-2 border bg-primary border-input rounded-2xl"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <AiOutlineMail className="absolute text-gray-400 right-2 top-3" />
            </div>
          </div>
          <div>
            <label>비밀번호</label>
            <div className="relative w-full my-2 shadow-xl rounded-2xl">
              <input
                className="w-full p-2 border bg-primary border-input rounded-2xl"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <AiFillLock className="absolute text-gray-400 right-2 top-3" />
            </div>
          </div>
          <button className="w-full p-3 my-2 shadow-xl bg-button text-btnText rounded-2xl">
            회원가입
          </button>
        </form>
        <p className="my-4">
          이미 계정이 있으신가요?{" "}
          <Link to="/signin" className="text-accent">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
