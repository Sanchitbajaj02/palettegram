"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const localUserId = localStorage.getItem("userId")!;
const localEmail = localStorage.getItem("email")!;
const localfullName = localStorage.getItem("fullName")!;
const localUsername = localStorage.getItem("username")!;
const localCreatedAt = localStorage.getItem("createdAt")!;

export type userDetail = {
  creds: {
    userId: string;
    email: string;
    fullName: string;
    createdAt: string;
    username: string;
  };
  error: boolean;
  loading: boolean;
};

const initialState: userDetail = {
  creds: {
    userId: localUserId ?? "",
    email: localEmail ?? "",
    fullName: localfullName ?? "",
    createdAt: localCreatedAt ?? "",
    username: localUsername ?? "",
  },
  error: false,
  loading: false,
};

export const registerReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    me: (state, action: PayloadAction<any>) => {
      state.loading = true;
      // const cookies = parseCookies();
      const id = localStorage.getItem("userId");

      if (id) {
        console.log(id);
        //   const {
        //     email_id,
        //     username,
        //     user_type,
        //     supplier_type,
        //     phone_no,
        //     status,
        //     id,
        //   }: UserState = jwtDecode(cookies.token);
        //   state.user = { email_id, username, user_type, phone_no, status, id, supplier_type };
        //   state.isAuth = true;
      } else {
        // state.isAuth = fa
      }
    },
    saveUser: (state, action: PayloadAction<any>) => {
      state.loading = true;
      // const { userId, email, fullName, createdAt } = action.payload;
      // state.userId = userId;
      // state.email = email;
      // state.fullName = fullName;
      // state.createdAt = createdAt;

      state.creds = action.payload;
      state.error = false;
      state.loading = false;
    },
  },
});

export const { saveUser } = registerReducer.actions;

export default registerReducer.reducer;
