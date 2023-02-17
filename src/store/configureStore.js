import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authStore'
import visitorReducer from './visitorStore'

const store = configureStore({
  reducer: {
    auth: authReducer,
    visitor: visitorReducer,
  },
})

export default store
