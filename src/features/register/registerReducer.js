import { createSlice } from "@reduxjs/toolkit";

export const registerReducer = createSlice({
  name: "register",
  initialState: {
    email: "",
    fullName: "",
    createdAt: "",
    username: "",
    password: "",
  },
  reducers: {
    updateRegisterDetails: (state, action) => {
      const {email,password,fullName,username} = action.payload;
      state.email = email;
      state.password = password;
      state.fullName = fullName;
      state.username = username;
      state.createdAt = new Date().toLocaleString();
    },
  },
});

export const { updateRegisterDetails } = registerReducer.actions;

export default registerReducer.reducer;
