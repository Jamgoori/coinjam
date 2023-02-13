import { AiFillLock } from 'react-icons/ai'
import React from 'react'

const PasswordInput = ({ onChange }) => {
  return (
    <div>
      <label>비밀번호</label>
      <div className="relative w-full my-2 shadow-xl rounded-2xl">
        <input className="w-full p-2 border bg-primary border-input rounded-2xl" type="password" onChange={onChange} />
        <AiFillLock className="absolute text-gray-400 right-2 top-3" />
      </div>
    </div>
  )
}

export default PasswordInput
