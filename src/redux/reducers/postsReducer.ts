"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PostInstanceType, PostInitStateType } from "@/types/index.d";

const initialState: PostInitStateType = {
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
    addPost: (state, action: PayloadAction<PostInstanceType>) => {
      state.loading = true;
      const postInstance: PostInstanceType = action.payload;
      state.posts.unshift(postInstance);
      state.error = false;
      state.loading = false;
    },
  },
});

export const { getPosts, addPost } = postsReducer.actions;

export default postsReducer.reducer;
