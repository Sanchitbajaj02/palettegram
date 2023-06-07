import { createSlice } from "@reduxjs/toolkit";

export const postsReducer = createSlice({
  name: "posts",
  initialState: {
    posts: [],
  },
  reducers: {
    updatePosts: (state, payload) => {},
  },
});

export const { updatePosts } = postsReducer.actions;

export default postsReducer.reducer;
