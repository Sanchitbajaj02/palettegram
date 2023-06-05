import { createSlice } from "@reduxjs/toolkit";

export const registerReducer = createSlice({
  name: "register",
  initialState: {
    email: "",
    fullName: "",
    createdAt: "",
    username: "",
  },
  reducers: {
    updateRegisterDetails: (state, payload) => {},
  },
});

export const { updateRegisterDetails } = registerReducer.actions;

export default registerReducer.reducer;
