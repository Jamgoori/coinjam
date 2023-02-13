import React from 'react'
import CoinSearch from '../components/template/CoinSearch'
import GoToTop from '../components/template/GotoTop'
import Trending from '../components/template/Trending'

const Home = ({ coins }) => {
  return (
    <>
      {/* <CoinSearch coins={coins} />
      <Trending />
      <GoToTop />
       */}
      <CoinSearch coins={coins} />
      <Trending />
      <GoToTop />
    </>
  )
}

export default Home
