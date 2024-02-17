"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { setCookie, destroyCookie } from "nookies";
import { userDetail } from "@/types/index.d";

const initialState: userDetail = {
  creds: {
    accountId: "",
    email: "",
    createdAt: "",
    isVerified: false,
    avatarURL: "",
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
      setCookie(null, "accountId", action.payload.accountId);
      setCookie(null, "isVerified", String(action.payload.isVerified));
      state.error = false;
      state.loading = false;
    },
    logUserOut: (state) => {
      state.error = true;
      state.loading = true;
      destroyCookie(null, "accountId");
      destroyCookie(null, "isVerified");
      state.creds.accountId = "";
      state.creds.email = "";
      state.creds.createdAt = "";
      state.creds.isVerified = false;
      state.loading = false;
    },
  },
});

export const { saveUser, logUserOut } = registerReducer.actions;

export default registerReducer.reducer;
