import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const visitorSlice = createSlice({
  name: 'visitor',
  initialState: [],
  reducers: {
    initVisitor: (state, action) => {
      return action.payload
    },
    addVisitor: (state, action) => {
      return [...state, action.payload]
    },
    deleteVisitor: (state, action) => {
      return [...state.filter((item) => item.id !== action.payload)]
    },
    likeVisitor: (state, action) => {
      const findIndex = state.findIndex((s) => s.id === action.payload)
      state[findIndex].like += 1
    },
    dislikeVisitor: (state, action) => {
      const findIndex = state.findIndex((s) => s.id === action.payload)
      state[findIndex].dislike += 1
    },
  },
})
export const selectVisitor = (state) => state.visitor
export const useSelectVisitor = () => useSelector(selectVisitor)
export const { initVisitor, addVisitor, deleteVisitor, likeVisitor, dislikeVisitor } = visitorSlice.actions
export default visitorSlice.reducer
