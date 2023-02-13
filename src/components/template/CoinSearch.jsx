import React, { useState } from 'react'
import CoinItem from '../molecules/CoinItem'
import CoinSearchInput from '../molecules/CoinSearchInput'

const CoinSearch = ({ coins }) => {
  const [searchText, setSearchText] = useState('')
  return (
    <div className="my-4 rounded-div">
      <CoinSearchInput onChange={(e) => setSearchText(e.target.value)} />
      <table className="w-full text-center border-collapse">
        <thead>
          <tr className="border-b">
            <th></th>
            <th className="px-4">#</th>
            <th className="text-left">coin</th>
            <th></th>
            <th>가격</th>
            <th>24시간</th>
            <th className="hidden md:table-cell">24시간 거래량</th>
            <th className="hidden sm:table-cell">시가총액</th>
            <th>7일 그래프</th>
          </tr>
        </thead>
        <tbody>
          {coins
            .filter((value) => {
              if (searchText === '') {
                return value
              } else if (value.name.toLowerCase().includes(searchText.toLowerCase())) {
                return value
              }
            })
            .map((coin) => (
              <CoinItem key={coin.id} coin={coin} />
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default CoinSearch
