import React, { useState } from 'react'
import { useSelectUser } from '../../store/authStore'
import { CollectionName, db } from '../../firebase'
import { doc, updateDoc } from 'firebase/firestore'

const CommentItem = ({ comment, deleteHandler }) => {
  const [like, setLike] = useState(comment.like)
  const [dislike, setDislike] = useState(comment.dislike)
  const user = useSelectUser()
  const likeHandler = async () => {
    // 원하는 데이터 가져옴
    const commentDoc = doc(db, CollectionName.COMMENT, comment.id)
    try {
      await updateDoc(commentDoc, { like: like + 1 })
      setLike((prev) => prev + 1)
    } catch (e) {
      console.log(e)
    }
  }
  const dislikeHandler = async () => {
    const commentDoc = doc(db, CollectionName.COMMENT, comment.id)
    try {
      await updateDoc(commentDoc, { dislike: dislike + 1 })
      setDislike((prev) => prev + 1)
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div className="mx-4 my-10 rounded-lg shadow-lg">
      <div className="px-4 py-6">
        <div className="">
          <div className="flex justify-between">
            <h2 className="-mt-1 text-lg">{comment.creator.email}</h2>
            {user.uid === comment.creator.uid ? <button onClick={deleteHandler}>삭제</button> : null}
          </div>
          <p className="text-sm">{comment.createdAt}</p>
          <p className="mt-3 text-m">{comment.comment}</p>
          <div className="flex items-end justify-end mt-4">
            <div className="flex mr-2 mr-3 text-sm cursor-pointer" onClick={likeHandler}>
              <div>❤️</div>
              <span>{like}</span>
            </div>
            <div className="flex mr-2 mr-3 text-sm cursor-pointer" onClick={dislikeHandler}>
              <div>💔</div>
              <span>{dislike}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CommentItem
