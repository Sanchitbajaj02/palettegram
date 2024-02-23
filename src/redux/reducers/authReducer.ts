"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { setCookie, destroyCookie } from "nookies";
import { authDetails, userDetails } from "@/types/auth.d";

const initialState: userDetails = {
  data: {},
  accountId: "",
  error: false,
  loading: false,
};

export const registerReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<any>) => {
      state.loading = true;
      state.data = action.payload;
      state.accountId = action.payload.accountId;
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
      destroyCookie(null, "userId");
      state.data = {};
      state.loading = false;
    },
  },
});

export const { saveUser, logUserOut } = registerReducer.actions;

export default registerReducer.reducer;
