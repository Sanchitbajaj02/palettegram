"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const postsReducer = createSlice({
  name: "posts",
  initialState: {
    posts: [],
  },
  reducers: {
    updatePosts: (state, payload: PayloadAction<any>) => {},
  },
});

export const { updatePosts } = postsReducer.actions;

export default postsReducer.reducer;
