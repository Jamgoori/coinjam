import React from 'react'
import CoinCurrency from '../atom/CoinCurrency'

const TrendingItem = ({ img, name, symbol, price }) => {
  return (
    <>
      <div className="rounded-div flex justify-between p-4 hover:scale-105 ease-in-out duration-300">
        <div className="flex w-full items-center justify-between">
          <div className="flex">
            <img className="mr-4 rounded-full" src={img} alt="/" />
            <div>
              <p className="font-bold">{name}</p>
              <p>{symbol}</p>
            </div>
          </div>
          <div className="flex items-center">
            <CoinCurrency />
            <p>{price.toFixed(7)}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default TrendingItem
