import React from 'react'
import { useSelectUser } from '../../store/authStore'

const VisitorItem = ({ visitor, deleteHandler, likeHandler, dislikeHandler }) => {
  const user = useSelectUser()
  return (
    <div className="shadow-lg rounded-lg mx-4 my-10">
      <div className="px-4 py-6">
        <div className="">
          <div className="flex justify-between">
            <h2 className="text-lg -mt-1">{visitor.creator.email}</h2>
            {user && user.uid === visitor.creator.uid ? <button onClick={deleteHandler}>삭제</button> : null}
          </div>
          <p className="text-sm">{visitor.createdAt}</p>
          <p className="mt-3 text-m">{visitor.comment}</p>
          <div className="mt-4 flex justify-end items-end">
            <div className="flex mr-2 text-sm mr-3 cursor-pointer" onClick={likeHandler}>
              <div>❤️</div>
              <span>{visitor.like}</span>
            </div>
            <div className="flex mr-2 text-sm mr-3 cursor-pointer" onClick={dislikeHandler}>
              <div>💔</div>
              <span>{visitor.dislike}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VisitorItem
