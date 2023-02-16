import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import SaveCoinItem from '../molecules/SaveCoinItem'
import { useSelector } from 'react-redux'
import { selectUser } from '../../store/authStore'

const SavedCoin = () => {
  const [coins, setCoins] = useState([])
  const user = useSelector(selectUser)

  useEffect(() => {
    onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
      setCoins(doc.data()?.watchList)
    })
  }, [user?.email])
  const coinPath = doc(db, 'users', `${user?.email}`)
  const deleteCoin = async (passedid) => {
    try {
      const result = coins.filter((item) => item.id !== passedid)
      await updateDoc(coinPath, {
        watchList: result,
      })
    } catch (e) {
      console.log(e.message)
    }
  }
  return (
    <div>
      {coins & (coins.length === 0) ? (
        <p>
          저장된 코인이 없습니다. 관심 리스트에 코인을 추가하세요. <Link to="/">추가하러 가기</Link>
        </p>
      ) : (
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="border-b">
              <th className="px-4">Rank #</th>
              <th className="text-left">코인</th>
              <th className="text-left">삭제</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <SaveCoinItem
                key={coin.id}
                id={coin.id}
                rank={coin.rank}
                name={coin.name}
                symbol={coin.symbol}
                image={coin.image}
                onClick={() => deleteCoin(coin.id)}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
export default SavedCoin
