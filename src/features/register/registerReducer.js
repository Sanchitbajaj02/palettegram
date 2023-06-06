import { createSlice } from "@reduxjs/toolkit";

const localemail = localStorage.getItem("email") ?? "";
const localfullName = localStorage.getItem("fullName") ?? "";
const localcreatedAt = localStorage.getItem("createdAt") ?? "";
const localusername = localStorage.getItem("username") ?? "";

export const registerReducer = createSlice({
  name: "register",
  initialState: {
    email: localemail,
    fullName: localfullName,
    createdAt: localcreatedAt,
    username: localusername,
  },
  reducers: {
    updateRegisterDetails: (state, action) => {
      const {email,fullName,username} = action.payload;
      state.email = email;
      state.fullName = fullName;
      state.username = username;
      state.createdAt = new Date().toLocaleString();
    },
  },
});

export const { updateRegisterDetails } = registerReducer.actions;

export default registerReducer.reducer;
