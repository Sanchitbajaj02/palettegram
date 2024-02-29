"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { destroyCookie } from "nookies";
import { userCollectionDB, userDetails } from "@/types/auth.d";

const initialState: userDetails = {
  data: {},
  error: false,
  loading: false,
};

export const registerReducer: any = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveUserToStore: (state, action: PayloadAction<userCollectionDB>) => {
      state.loading = true;
      state.data = action.payload;
      state.error = false;
      state.loading = false;
    },
    logUserOut: (state) => {
      state.error = false;
      state.loading = true;
      destroyCookie(null, "accountId");
      destroyCookie(null, "isVerified");
      destroyCookie(null, "userId");
      state.data = {};
      state.loading = false;
    },
  },
});

export const { saveUserToStore, logUserOut } = registerReducer.actions;

export default registerReducer.reducer;
