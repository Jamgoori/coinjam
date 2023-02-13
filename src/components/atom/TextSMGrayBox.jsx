import React from 'react'

const TextSMGrayBox = ({ title, body }) => {
  return (
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      {body ? <p>{body}</p> : null}
    </div>
  )
}

export default TextSMGrayBox
