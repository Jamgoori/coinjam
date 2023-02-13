import { AiOutlineMail } from 'react-icons/ai'
import React from 'react'

const EmailInput = ({ onChange }) => {
  return (
    <>
      <div className="my-4">
        <label>이메일</label>
        <div className="relative w-full my-2 shadow-xl rounded-2xl">
          <input className="w-full p-2 border bg-primary border-input rounded-2xl" type="email" onChange={onChange} />
          <AiOutlineMail className="absolute text-gray-400 right-2 top-3" />
        </div>
      </div>
    </>
  )
}

export default EmailInput
