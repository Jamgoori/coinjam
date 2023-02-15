import React, { useEffect, useState } from 'react'
import DOMPurify from 'dompurify'
import { useParams } from 'react-router-dom'
import { getFindCoin } from '../queries/getFindCoin'
import CoinDetail from '../components/template/CoinDetail'

const Coinpage = () => {
  const [coin, setCoin] = useState({})
  const params = useParams()

  useEffect(() => {
    getFindCoin(params.coinId).then((response) => {
      setCoin(response.data)
    })
  }, [params])

  return (
    <div className="py-8 my-12 rounded-div">
      <div className="flex py-8">
        <img className="w-20 mr-8" src={coin.image?.large} alt={'coin-img'} />
        <div>
          <p className="text-3xl font-bold">{coin?.name}</p>
          <p>({coin.symbol?.toUpperCase()} / KRW)</p>
        </div>
      </div>
      <CoinDetail coin={coin} />
      {/* 설명 */}
      <div className="py-4">
        <p className="text-xl font-bold">About {coin.name}</p>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(coin.description ? coin.description.en : ''),
          }}
        ></p>
      </div>
    </div>
  )
}
export default Coinpage
