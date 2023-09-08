"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { setCookie } from "nookies";

const localObject = JSON.parse(String(localStorage.getItem("credentials")));

export type userDetail = {
  creds: {
    userId: string;
    email: string;
    createdAt: string;
  };
  error: boolean;
  loading: boolean;
};

const initialState: userDetail = {
  creds: {
    userId: localObject?.userId ?? "",
    email: localObject?.email ?? "",
    createdAt: localObject?.createdAt ?? "",
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
    logout: (state, action: PayloadAction<any>) => {
      state.loading = true;
      state.error = false;
      state.creds.userId = "";
      state.creds.email = "";
      state.creds.createdAt = "";
      state.loading = false;
    },
  },
});

export const { saveUser } = registerReducer.actions;

export default registerReducer.reducer;
