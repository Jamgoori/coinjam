import React, { useState, useEffect } from 'react'

const GoToTop = () => {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    })

    return () => window.removeEventListener('scroll', () => {})
  }, [])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={`fixed bottom-0 right-0 mb-4 mr-4 ${showButton ? 'block' : 'hidden'}`}>
      <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded">
        맨 위로
      </button>
    </div>
  )
}

export default GoToTop
