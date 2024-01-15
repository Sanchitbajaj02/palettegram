"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { setCookie } from "cookies";
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
      setCookie(null, "userId", action.payload.userId);
      state.error = false;
      state.loading = false;
    },
    logUserOut: (state) => {
      state.loading = true;
    
      try {
        // Clear user ID cookie
        setCookie(null, "userId", "");
    
        // Reset state values
        state.creds.userId = "";
        state.creds.email = "";
        state.creds.createdAt = "";
        state.creds.isVerified = false;
        state.error = false;
      } catch (error) {
        console.error("Error clearing user ID cookie:", error);
        // Handle the error as needed
      } finally {
        state.loading = false;
      }
    },  
  },
});

export const { saveUser, logUserOut } = registerReducer.actions;

export default registerReducer.reducer;
