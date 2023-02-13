import React from "react";
import CoinSearch from "../components/CoinSearch";
import GoToTop from "../components/GotoTop";
import Trending from "../components/Trending";
const Home = ({ coins }) => {
  return (
    <div>
      <CoinSearch coins={coins} />
      <Trending />
      <GoToTop />
    </div>
  );
};

export default Home;
