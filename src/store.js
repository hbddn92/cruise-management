import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/authentication/authSlice'

export default configureStore({
  reducer: authSlice
})