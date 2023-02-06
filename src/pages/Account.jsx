import React from "react";
import SavedCoin from "../components/SavedCoin";

const Account = () => {
  return (
    <div>
      <div>
        <div>
          <h1>계정</h1>
          <div>
            <p>안녕하세요</p>
          </div>
        </div>
        <div>
          <button>로그아웃</button>
        </div>
      </div>
      <div>
        <div>
          <h1>관심 리스트</h1>
          <SavedCoin />
        </div>
      </div>
    </div>
  );
};

export default Account;
