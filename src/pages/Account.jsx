import React from "react";
import SavedCoin from "../components/SavedCoin";

const Account = () => {
  return (
    <div className="max-w-[1140px] mx-auto">
      <div className="flex items-center justify-between py-8 my-12 rounded-div">
        <div>
          <h1 className="text-2xl font-bold">계정</h1>
          <div>
            <p>안녕하세요</p>
          </div>
        </div>
        <div>
          <button className="px-6 py-2 border shadow-lg rounded-2xl hover:shadow-2xl">
            로그아웃
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between py-8 my-12 rouded-div">
        <div className="w-full min-h-[300px]">
          <h1 className="py-4 text-2xl font-bold">관심 리스트</h1>
          <SavedCoin />
        </div>
      </div>
    </div>
  );
};

export default Account;
