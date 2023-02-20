import React, { useCallback, useEffect, useState } from 'react'
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc } from 'firebase/firestore'
import { CollectionName, db } from '../firebase'
import dayjs from 'dayjs'
import { useSelectUser } from '../store/authStore'
import CommentBox from '../components/atom/CommentBox'
import {
  addVisitor,
  deleteVisitor,
  dislikeVisitor,
  initVisitor,
  likeVisitor,
  useSelectVisitor,
} from '../store/visitorStore'
import { useDispatch } from 'react-redux'
import VisitorItem from '../components/molecules/VisitorItem'
const Visitors = () => {
  const user = useSelectUser()
  const visitorSelect = useSelectVisitor()
  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const saveVisitor = async (e) => {
    e.preventDefault()
    if (!user) {
      alert('로그인 필요')
      return
    }
    const saveVisitorData = {
      comment: value,
      createdAt: dayjs().format('YYYY-MM-DD'),
      like: 0,
      dislike: 0,
      creator: user,
    }
    const data = await addDoc(collection(db, CollectionName.VISITOR), saveVisitorData)
    setValue('')
    dispatch(addVisitor({ id: data.id, ...saveVisitorData }))
  }
  const likeHandler = async (visitor) => {
    if (!user) {
      alert('로그인 필요')
      return
    }
    // 자기글의 좋아요 이벤트 무시
    if (user.uid === visitor.creator.uid) {
      return
    }
    // 원하는 데이터 가져옴
    const visitorDoc = doc(db, CollectionName.VISITOR, visitor.id)
    try {
      await updateDoc(visitorDoc, { like: visitor.like + 1 })
      dispatch(likeVisitor(visitor.id))
    } catch (e) {
      console.log(e)
    }
  }
  const dislikeHandler = async (visitor) => {
    if (!user) {
      alert('로그인 필요')
      return
    }
    // 자기글의 싫어요 이벤트 무시
    if (user.uid === visitor.creator.uid) {
      return
    }
    const visitorDoc = doc(db, CollectionName.VISITOR, visitor.id)
    try {
      await updateDoc(visitorDoc, { dislike: visitor.dislike + 1 })
      dispatch(dislikeVisitor(visitor.id))
    } catch (e) {
      console.log(e)
    }
  }
  const deleteHandler = async (id) => {
    const visitorDoc = doc(db, CollectionName.VISITOR, id)
    try {
      await deleteDoc(visitorDoc)
      dispatch(deleteVisitor(id))
    } catch (e) {
      console.log(e)
    }
  }
  const getVisitors = useCallback(async () => {
    const q = await query(collection(db, CollectionName.VISITOR))
    const data = await getDocs(q)
    const newData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    const visitorData = newData.map((visitor) => {
      return {
        id: visitor.id,
        comment: visitor.comment,
        createdAt: visitor.createdAt,
        like: visitor.like,
        dislike: visitor.dislike,
        creator: visitor.creator,
      }
    })
    dispatch(initVisitor(visitorData.reverse()))
  }, [dispatch])
  useEffect(() => {
    getVisitors()
  }, [getVisitors])
  return (
    <div className="py-8 my-4 rounded-div">
      {visitorSelect.map((visitor, index) => {
        return (
          <VisitorItem
            key={index}
            visitor={visitor}
            deleteHandler={() => deleteHandler(visitor.id)}
            likeHandler={() => likeHandler(visitor)}
            dislikeHandler={() => dislikeHandler(visitor)}
          />
        )
      })}
      <CommentBox onSubmit={saveVisitor} value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  )
}
export default Visitors
