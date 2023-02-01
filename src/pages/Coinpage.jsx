import React, { useState, useEffect } from "react";
import axios from "axios";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { FaTwitter, FaFacebook, FaGithub, FaTelegram } from "react-icons/fa";
import DOMPurify from "dompurify";
const Coinpage = () => {
  const [coin, setCoin] = useState({});
  const url = `https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&sparkline=true`;
  useEffect(() => {
    axios.get(url).then((response) => {
      setCoin(response.data);
      console.log(response.data);
    });
  }, [url]);
  return (
    <div className="rounded-div my-12 py-8">
      <div className="flex py-8">
        <img className="w-20 mr-8" src={coin.image?.large} />
        <div>
          <p className="text-3xl font-bold">{coin?.name}</p>
          <p>({coin.symbol?.toUpperCase()} / KRW)</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="flex justify-between">
            {coin.market_data?.current_price ? (
              <p className="text-3xl font-bold">
                ₩ {coin.market_data.current_price.krw.toLocaleString()}
              </p>
            ) : null}
            <p>7일</p>
          </div>
          <div>
            <Sparklines data={coin.market_data?.sparkline_7d.price}>
              <SparklinesLine color="teal" />
            </Sparklines>
          </div>
          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-500 text-sm">시가 총액</p>
              {coin.market_data?.market_cap ? (
                <p>₩ {coin.market_data.market_cap.krw.toLocaleString()}</p>
              ) : null}
            </div>
            <div>
              <p className="text-gray-500 text-sm">거래량 (24h)</p>
              {coin.market_data?.market_cap ? (
                <p>₩ {coin.market_data.total_volume.krw.toLocaleString()}</p>
              ) : null}
            </div>
          </div>

          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-500 text-sm">24h 최고가</p>
              {coin.market_data?.high_24h ? (
                <p>₩ {coin.market_data.high_24h.krw.toLocaleString()}</p>
              ) : null}
            </div>
            <div>
              <p className="text-gray-500 text-sm">24h 최저가</p>
              {coin.market_data?.low_24h ? (
                <p>₩ {coin.market_data.low_24h.krw.toLocaleString()}</p>
              ) : null}
            </div>
          </div>
        </div>

        <div>
          <p className="text-xl font-bold">시장 상황</p>
          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-500 text-sm">Rank</p>#
              {coin.market_cap_rank}
            </div>

            <div>
              <p className="text-gray-500 text-sm">유동성</p>
              {coin.tickers ? <p>{coin.liquidity_score.toFixed(2)}</p> : null}
            </div>
          </div>
          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-500 text-sm">가격 변동(24h)</p>
              {coin.market_data ? (
                <p>
                  {coin.market_data.price_change_percentage_24h.toFixed(2)}%
                </p>
              ) : null}
            </div>
            <div>
              <p className="text-gray-500 text-sm">가격 변동(7d)</p>
              {coin.market_data ? (
                <p>{coin.market_data.price_change_percentage_7d.toFixed(2)}%</p>
              ) : null}
            </div>

            <div>
              <p className="text-gray-500 text-sm">가격 변동(14d)</p>
              {coin.market_data ? (
                <p>
                  {coin.market_data.price_change_percentage_14d.toFixed(2)}%
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-500 text-sm">가격 변동(30d)</p>
              {coin.market_data ? (
                <p>
                  {coin.market_data.price_change_percentage_30d.toFixed(2)}%
                </p>
              ) : null}
            </div>

            <div>
              <p className="text-gray-500 text-sm">가격 변동(60d)</p>
              {coin.market_data ? (
                <p>
                  {coin.market_data.price_change_percentage_60d.toFixed(2)}%
                </p>
              ) : null}
            </div>

            <div>
              <p className="text-gray-500 text-sm">가격 변동(1y)</p>
              {coin.market_data ? (
                <p>{coin.market_data.price_change_percentage_1y.toFixed(2)}%</p>
              ) : null}
            </div>
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
            __html: DOMPurify.sanitize(
              coin.description ? coin.description.en : ""
            ),
          }}
        ></p>
      </div>
    </div>
  );
};

export default Coinpage;
