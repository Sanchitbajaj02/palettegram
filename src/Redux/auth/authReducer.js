import { createSlice } from "@reduxjs/toolkit";

const localUserId = localStorage.getItem("userId");
const localEmail = localStorage.getItem("email");
const localfullName = localStorage.getItem("fullName");
const localUsername = localStorage.getItem("username");
const localCreatedAt = localStorage.getItem("createdAt");

const initialState = {
  creds: {
    userId: localUserId ?? "",
    email: localEmail ?? "",
    fullName: localfullName ?? "",
    createdAt: localCreatedAt ?? "",
    username: localUsername ?? "",
  },
  error: false,
  loading: false,
};

export const registerReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.loading = true;
      // const { userId, email, fullName, createdAt } = action.payload;
      // state.userId = userId;
      // state.email = email;
      // state.fullName = fullName;
      // state.createdAt = createdAt;

      state.creds = action.payload;
      state.error = false;
      state.loading = false;

      return state;
    },
  },
});

export const { saveUser } = registerReducer.actions;

export default registerReducer.reducer;
