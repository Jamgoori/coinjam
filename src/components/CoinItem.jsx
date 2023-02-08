import React, { useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
const CoinItem = ({ coin }) => {
  const [savedCoin, setSavedCoin] = useState(false);
  const { user } = UserAuth();

  const coinPath = doc(db, "users", `${user?.email}`);
  const saveCoin = async () => {
    if (user?.email) {
      setSavedCoin(true);
      await updateDoc(coinPath, {
        watchList: arrayUnion({
          id: coin.id,
          name: coin.name,
          image: coin.image,
          rank: coin.market_cap_rank,
          symbol: coin.symbol,
        }),
      });
    } else {
      alert("관심 리스트에 추가하기 위해 로그인해 주세요.");
    }
  };
  return (
    <tr className="h-[80px] border-b overflow-hidden">
      <td onClick={saveCoin} className="text-xl hover:cursor-pointer">
        {savedCoin ? <AiFillStar /> : <AiOutlineStar />}
      </td>
      <td>{coin.market_cap_rank}</td>
      <td>
        <Link to={`/coin/${coin.id}`} onClick={() => window.scrollTo(0, 0)}>
          <div className="flex item-center">
            <img
              className="w-6 mr-2 rounded-full"
              src={coin.image}
              alt={coin.id}
            />
            <p className="hidden sm:table-cell">{coin.name}</p>
          </div>
        </Link>
      </td>
      <td>{coin.symbol.toUpperCase()}</td>
      <td>
        ₩ {coin.current_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </td>
      <td>
        {coin.price_change_percentage_24h > 0 ? (
          <p className="text-red-600">
            {coin.price_change_percentage_24h.toFixed(2)}%▲
          </p>
        ) : (
          <p className="text-blue-600">
            {coin.price_change_percentage_24h.toFixed(2)}%▼
          </p>
        )}
      </td>
      <td className="w-[180px hidden md:table-cell">
        ₩ {coin.total_volume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </td>
      <td className="w-[180px hidden sm:table-cell">
        ₩ {coin.market_cap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </td>
      <td>
        <Sparklines data={coin.sparkline_in_7d.price}>
          <SparklinesLine color="teal" />
        </Sparklines>
      </td>
    </tr>
  );
};

export default CoinItem;
