import React, { useState } from 'react'
import { useSelectUser } from '../../store/authStore'
import { CollectionName, db } from '../../firebase'
import { doc, updateDoc } from 'firebase/firestore'
const CommentItem = ({ comment, deleteHandler }) => {
  const [like, setLike] = useState(comment.like)
  const [dislike, setDislike] = useState(comment.dislike)
  const user = useSelectUser()
  const likeHandler = async () => {
    if (!user) {
      alert('로그인 필요')
      return
    }
    // 자기글의 좋아요 이벤트 무시
    if (user.uid === comment.creator.uid) {
      return
    }
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
    if (!user) {
      alert('로그인 필요')
      return
    }
    // 자기글의 싫어요 이벤트 무시
    if (user.uid === comment.creator.uid) {
      return
    }
    const commentDoc = doc(db, CollectionName.COMMENT, comment.id)
    try {
      await updateDoc(commentDoc, { dislike: dislike + 1 })
      setDislike((prev) => prev + 1)
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div className="shadow-lg rounded-lg mx-4 my-10">
      <div className="px-4 py-6">
        <div className="">
          <div className="flex justify-between">
            <h2 className="text-lg -mt-1">{comment.creator.email}</h2>
            {user && user.uid === comment.creator.uid ? <button onClick={deleteHandler}>삭제</button> : null}
          </div>
          <p className="text-sm">{comment.createdAt}</p>
          <p className="mt-3 text-m">{comment.comment}</p>
          <div className="mt-4 flex justify-end items-end">
            <div className="flex mr-2 text-sm mr-3 cursor-pointer" onClick={likeHandler}>
              <div>❤️</div>
              <span>{like}</span>
            </div>
            <div className="flex mr-2 text-sm mr-3 cursor-pointer" onClick={dislikeHandler}>
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
