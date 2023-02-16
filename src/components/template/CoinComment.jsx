import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase'
import CommentBox from '../atom/CommentBox'
import CommentItem from '../molecules/comentItem'
import { selectUser } from '../../store/authStore'

const CoinComment = ({ coin }) => {
  const [value, setValue] = useState('')
  const [comments, setComments] = useState([])
  const user = useSelector(selectUser)
  const params = useParams()
  const saveComment = async (e) => {
    e.preventDefault()
    if (!user) {
      alert('로그인 필요')
      return
    }
    const newComment = {
      comment: value,
      createdAt: dayjs().format('YYYY-MM-DD'),
      coinId: params.coinId,
      like: 0,
      dislike: 0,
      creator: user,
    }
    const docRef = await addDoc(collection(db, 'comments'), newComment)
    setComments([...comments, { id: docRef.id, ...newComment }])
    setValue('')
  }
  const getComments = useCallback(async () => {
    const q = query(collection(db, 'comments'), where('coinId', '==', params.coinId))
    const querySnapshot = await getDocs(q)
    const commentData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    setComments(commentData)
  }, [params])
  useEffect(() => {
    getComments()
  }, [getComments, params.coinId])
  return (
    <div className="py-8 my-4 rounded-div">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
      <CommentBox onSubmit={saveComment} value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  )
}

export default CoinComment
