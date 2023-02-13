import React from 'react'

const CoinSearchInput = ({ onChange }) => {
  return (
    <div className="flex flex-col justify-between pt-4 pb-6 text-center md:flex-row md:flex md:text-right">
      <h1 className="my-2 text-2xl font-bold">코인 검색</h1>
      <form>
        <input
          onChange={onChange}
          type="text"
          placeholder="코인 검색"
          className="w-full px-4 py-2 border shadow-xl bg-primary border-input rounded-2xl "
        />
      </form>
    </div>
  )
}

export default CoinSearchInput
