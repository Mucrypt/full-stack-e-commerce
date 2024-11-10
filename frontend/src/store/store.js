import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import booksSlice from './booksSlice'

export const store = configureStore({
  reducer: {
    user : userReducer,
    books : booksSlice
    
  },
})