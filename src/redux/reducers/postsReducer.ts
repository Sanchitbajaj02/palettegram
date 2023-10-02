"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  error: false,
  loading: false,
};

export const postsReducer = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    getPosts: (state, action: PayloadAction<any>) => {
      state.loading = true;
      state.posts = action.payload;
      state.loading = false;
    },
    addPost: (state, action: PayloadAction<any>) => {
      state.loading = true;
      state.loading = false;
    },
  },
});

export const { getPosts } = postsReducer.actions;

export default postsReducer.reducer;
