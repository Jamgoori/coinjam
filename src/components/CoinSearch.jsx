import React, { useState } from "react";
import CoinItem from "./CoinItem";
const CoinSearch = ({ coins }) => {
  const [searchText, setSearchText] = useState("");
  console.log(coins);
  return (
    <div className="my-4 rounded-div">
      <div className="flex flex-col justify-between pt-4 pb-6 text-center md:flex-row md:flex md:text-right">
        <h1 className="my-2 text-2xl font-bold">코인 검색</h1>
        <form>
          <input
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            placeholder="코인 검색"
            className="w-full px-4 py-2 border shadow-xl bg-primary border-input rounded-2xl "
          />
        </form>
      </div>

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
