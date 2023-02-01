import React, { useState } from "react";
import CoinItem from "./CoinItem";
const CoinSearch = ({ coins }) => {
  const [searchText, setSearchText] = useState("");
  console.log(coins);
  return (
    <div>
      <div>
        <h1>코인 검색</h1>
        <form>
          <input
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            placeholder="코인 검색"
          />
        </form>
      </div>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>#</th>
            <th>coin</th>
            <th></th>
            <th>가격</th>
            <th>24시간</th>
            <th>24시간 거래량</th>
            <th>현재가</th>
            <th>7일 전</th>
          </tr>
        </thead>
        <tbody>
          {coins
            .filter((value) => {
              if (searchText === "") {
                return value;
              } else if (
                value.name.toLowerCase().includes(searchText.toLowerCase())
              ) {
                return value;
              }
            })
            .map((coin) => (
              <CoinItem key={coin.id} coin={coin} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinSearch;
