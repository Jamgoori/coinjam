import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
    },
  },
})
export const selectUser = (state) => state.auth.user
export const useSelectUser = () => useSelector(selectUser)
export const { login, logout } = authSlice.actions
export default authSlice.reducer
