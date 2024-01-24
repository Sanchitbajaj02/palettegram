"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { setCookie, destroyCookie } from "nookies";
import { userDetail } from "@/types/index.d";

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
      setCookie(null, "accountId", action.payload.userId);
      setCookie(null, "isVerified", action.payload.isVerified);
      state.error = false;
      state.loading = false;
    },
    logUserOut: (state) => {
      state.loading = true;
      destroyCookie(undefined, "accountId");
      state.error = false;
      state.creds.userId = "";
      state.creds.email = "";
      state.creds.createdAt = "";
      state.creds.isVerified = false;
      state.loading = false;
    },
  },
});

export const { saveUser, logUserOut } = registerReducer.actions;

export default registerReducer.reducer;
