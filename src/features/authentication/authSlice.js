import { createSlice } from '@reduxjs/toolkit'
import { auth } from '../../firebaseConfig'

export const authSlice = createSlice({
  name: 'authen',
  initialState: {
    isLogin: false,
  },
  reducers: {
    signInSuccessful: (state) => {
      state.isLogin = true
    },
    signInFail: state => {
      state.isLogin = false
    },
    signOutSuccessful: state => {
      state.isLogin = false
    }
  }
})

export const { signInSuccessful, signInFail, signOutSuccessful } = authSlice.actions;

export const signIn = values => dispatch => {
  auth.signInWithEmailAndPassword(
    values.email,
    values.password
  )
  .then(user => {
    dispatch(signInSuccessful(user));
  })
  .catch(() => {
    dispatch(signInFail());
  })
};

export const signOut = () => dispatch => {
  auth.signOut()
  .then(() => {
    dispatch(signOutSuccessful())
  })
  .catch(() => {
  });
};

export default authSlice