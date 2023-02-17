import React, { useCallback, useEffect, useState } from 'react'
import CommentBox from '../atom/CommentBox'
import { useSelectUser } from '../../store/authStore'
import { useParams } from 'react-router-dom'
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { CollectionName, db } from '../../firebase'
import dayjs from 'dayjs'
import CommentItem from '../molecules/comentItem'
const CoinComment = ({ coin }) => {
  const [value, setValue] = useState('')
  const [comments, setComments] = useState([])
  const user = useSelectUser()
  const params = useParams()
  // 댓글 저장
  const saveComment = async (e) => {
    e.preventDefault()
    if (!user) {
      alert('로그인 필요')
      return
    }
    //TODO coin 데이터가 잘안들어와 param의 coin id를 사용 중
    const saveCommentData = {
      comment: value,
      createdAt: dayjs().format('YYYY-MM-DD'),
      coinId: params.coinId, //coin.id
      like: 0,
      dislike: 0,
      creator: user,
    }
    const data = await addDoc(collection(db, CollectionName.COMMENT), saveCommentData)
    setValue('')
    setComments((prev) => [...prev, { id: data.id, ...saveCommentData }])
  }
  // 댓글 삭제
  const deleteHandler = async (id) => {
    const commentDoc = doc(db, CollectionName.COMMENT, id)
    try {
      await deleteDoc(commentDoc)
      setComments((prev) => [...prev.filter((comment) => comment.id !== id)])
    } catch (e) {
      console.log(e)
    }
  }
  // 댓글 초기값 세팅
  const getComment = useCallback(async () => {
    const q = await query(collection(db, CollectionName.COMMENT), where('coinId', '==', params.coinId))
    const data = await getDocs(q)
    const newData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    const commentData = newData.map((comment) => {
      return {
        id: comment.id,
        comment: comment.comment,
        createdAt: comment.createdAt,
        coinId: comment.coinId,
        like: comment.like,
        dislike: comment.dislike,
        creator: comment.creator,
      }
    })
    setComments(commentData)
  }, [params])
  useEffect(() => {
    getComment()
  }, [getComment])
  return (
    <div className="py-8 my-4 rounded-div">
      {comments.map((comment, index) => (
        <CommentItem key={index} comment={comment} deleteHandler={() => deleteHandler(comment.id)} />
      ))}
      <CommentBox onSubmit={saveComment} value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  )
}
export default CoinComment
