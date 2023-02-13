import React, { useEffect, useState } from 'react'
import { Sparklines, SparklinesLine } from 'react-sparklines'
import { FaFacebook, FaGithub, FaTelegram, FaTwitter } from 'react-icons/fa'
import DOMPurify from 'dompurify'
import { useParams } from 'react-router-dom'
import { getFindCoin } from '../queries/getFindCoin'
import TextSMGrayBox from '../components/atom/TextSMGrayBox'

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
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <div className="flex justify-between">
            {coin.market_data?.current_price ? (
              <p className="text-3xl font-bold">₩ {coin.market_data.current_price.krw.toLocaleString()}</p>
            ) : null}
            <p>7일</p>
          </div>
          <div>
            <Sparklines data={coin.market_data?.sparkline_7d.price}>
              <SparklinesLine color="teal" />
            </Sparklines>
          </div>
          <div className="flex justify-between py-4">
            <TextSMGrayBox
              title={'시가 총액'}
              body={coin.market_data ? `₩ ${coin.market_data.market_cap.krw.toLocaleString()}` : null}
            />
            <TextSMGrayBox
              title={'거래량 (24h)'}
              body={coin.market_data ? `₩ ${coin.market_data.total_volume.krw.toLocaleString()}` : null}
            />
          </div>

          <div className="flex justify-between py-4">
            <TextSMGrayBox
              title={'24h 최고가'}
              body={coin.market_data ? `₩ ${coin.market_data.high_24h.krw.toLocaleString()}` : null}
            />
            <TextSMGrayBox
              title={'24h 최저가'}
              body={coin.market_data ? `₩ ${coin.market_data.low_24h.krw.toLocaleString()}` : null}
            />
          </div>
        </div>

        <div>
          <p className="text-xl font-bold">시장 상황</p>
          <div className="flex justify-between py-4">
            <TextSMGrayBox title={'Rank'} body={coin ? `#${coin.market_cap_rank}` : null} />
            <TextSMGrayBox title={'유동성'} body={coin.tickers ? coin.liquidity_score.toFixed(2) : null} />
          </div>
          <div className="flex justify-between py-4">
            <TextSMGrayBox
              title={'가격 변동(24h)'}
              body={coin.market_data ? `${coin.market_data.price_change_percentage_24h.toFixed(2)}%` : null}
            />
            <TextSMGrayBox
              title={'가격 변동(7d)'}
              body={coin.market_data ? `${coin.market_data.price_change_percentage_7d.toFixed(2)}%` : null}
            />
            <TextSMGrayBox
              title={'가격 변동(14d)'}
              body={coin.market_data ? `${coin.market_data.price_change_percentage_14d.toFixed(2)}%` : null}
            />
          </div>

          <div className="flex justify-between py-4">
            <TextSMGrayBox
              title={'가격 변동(30d)'}
              body={coin.market_data ? `${coin.market_data.price_change_percentage_30d.toFixed(2)}%` : null}
            />
            <TextSMGrayBox
              title={'가격 변동(60d)'}
              body={coin.market_data ? `${coin.market_data.price_change_percentage_60d.toFixed(2)}%` : null}
            />
            <TextSMGrayBox
              title={'가격 변동(1y)'}
              body={coin.market_data ? `${coin.market_data.price_change_percentage_1y.toFixed(2)}%` : null}
            />
          </div>
          <div className="flex justify-around p-8 text-accent">
            <FaTwitter />
            <FaFacebook />
            <FaTelegram />
            <FaGithub />
          </div>
        </div>
      </div>
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
