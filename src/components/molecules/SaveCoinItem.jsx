import { Link } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai'
import React from 'react'

const SaveCoinItem = ({ rank, id, image, name, symbol, onClick }) => {
  return (
    <tr className="h-[60px] overflow-hidden">
      <td>{rank}</td>
      <td>
        <Link to={`/coin/${id}`}>
          <div className="flex items-center">
            <img src={image} className="w-8 mr-4" alt="/" />
            <div>
              <p className="hidden sm:table-cell">{name}</p>
              <p className="text-sm text-left text-gray-500">{symbol.toUpperCase()}</p>
            </div>
          </div>
        </Link>
      </td>
      <td className="pl-8">
        <AiOutlineClose onClick={onClick} className="cursor-pointer" />
      </td>
    </tr>
  )
}
export default SaveCoinItem
