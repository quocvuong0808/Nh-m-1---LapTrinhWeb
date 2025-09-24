import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    error: false,
  },
  reducers: {
    registerStart: (state) => {
      state.isLoading = true;
    },
    registerSuccess: (state) => {
      state.user = null;
      state.isLoading = false;
      state.error = false;
    },
    registerError: (state) => {
      state.error = true;
    },
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = false;
    },
    loginFailed: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    logoutStart: (state) => {
      state.isLoading = true;
      state.error = false
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.isLoading = false;
      state.error = false;
    },
    logoutFailed: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const {
  registerStart,
  registerSuccess,
  registerError,
  loginStart,
  loginSuccess,
  loginFailed,
  logoutStart,
  logoutSuccess,
  logoutFailed,
} = authSlice.actions;

export default authSlice.reducer;
