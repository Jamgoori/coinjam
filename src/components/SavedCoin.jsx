import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

const SavedCoin = () => {
  const [coins, setCoins] = useState([]);
  return (
    <div>
      {coins.length === 0 ? (
        <p>
          저장된 코인이 없습니다. 관심 리스트에 코인을 추가하세요.{" "}
          <Link to="/">추가하러 가기</Link>
        </p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Rank #</th>
              <th>코인</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <tr key={coin.id}>
                <td>{coin?.rank}</td>
                <td>
                  <AiOutlineClose />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SavedCoin;
