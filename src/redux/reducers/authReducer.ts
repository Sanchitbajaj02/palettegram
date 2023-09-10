"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { setCookie } from "nookies";

// const localObject = JSON.parse(String(localStorage.getItem("credentials")));

export type userDetail = {
  creds: {
    userId: string;
    email: string;
    createdAt: string;
    isVerified: boolean;
  };
  error: boolean;
  loading: boolean;
};

const initialState: userDetail = {
  creds: {
    userId: "",
    email: "",
    createdAt: "",
    isVerified: false,
  },
  error: false,
  loading: false,
};

export const registerReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<any>) => {
      state.loading = true;
      state.creds = action.payload;
      setCookie(null, "userId", action.payload.userId);
      state.error = false;
      state.loading = false;
    },
    logUserOut: (state) => {
      state.loading = true;
      setCookie(null, "userId", "");
      state.error = false;
      state.creds.userId = "";
      state.creds.email = "";
      state.creds.createdAt = "";
      state.loading = false;
    },
  },
});

export const { saveUser, logUserOut } = registerReducer.actions;

export default registerReducer.reducer;
