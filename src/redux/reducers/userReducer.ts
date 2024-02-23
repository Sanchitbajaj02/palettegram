"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { userDetails, userCollectionDB } from "@/types/auth.d";

const initialState: userDetails = {
  data: {},
  accountId: "",
  error: false,
  loading: false,
};

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveCurrentLoggedInUser: (state, action: PayloadAction<userCollectionDB>) => {
      state.error = false;
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
    },
  },
});

export const { saveCurrentLoggedInUser } = userReducer.actions;

export default userReducer.reducer;
