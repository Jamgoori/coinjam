import React, { useEffect, useState } from 'react'
import TrendingItem from '../molecules/TrendingItem'
import { getTrending } from '../../queries/getTrending'

const Trending = () => {
  const [trending, setTrending] = useState([])

  useEffect(() => {
    getTrending()
      .then((response) => {
        setTrending(response.data.coins)
      })
      .catch(() => {
        alert('코인게코의 서버가 불안정합니다.')
      })
  })
  return (
    <div className="rounded-div my-12 py-8 text-primary">
      <h1 className="text-2xl font-bold py-4">🔥 주목받는 코인</h1>
      <div className="grid md:grid-cols-2 lg:grind-cols-3 gap-4">
        {trending.length > 0 ? (
          trending.map((coin, idx) => (
            <TrendingItem key={idx} img={coin.item.small} symbol={coin.item.symbol} price={coin.item.price_btc} />
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  )
}

export default Trending
