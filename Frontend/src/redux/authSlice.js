import { createSlice } from "@reduxjs/toolkit";

// Retrieve initial state from localStorage
const token = localStorage.getItem("token");
const userDetails = localStorage.getItem("userDetails");

const initialState = {
  user: userDetails ? JSON.parse(userDetails) : null,
  token: token || null,
  isAuthenticated: !!token,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      // Save to localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userDetails", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      // Remove from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("userDetails");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
