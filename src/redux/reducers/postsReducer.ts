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
      state.error = false;
    },
    addPost: (state, action: PayloadAction<PostInstanceType>) => {
      state.loading = true;
      const postInstance: PostInstanceType = action.payload;
      state.posts.unshift(postInstance);
      state.error = false;
      state.loading = false;
    },
    addLikesToAPost: (state, action: PayloadAction<{ postId: string; userId: string }>) => {
      state.loading = true;

      const { postId, userId } = action.payload;

      state.posts.forEach((post: PostInstanceType) => {
        if (post.$id === postId) {
          if (post.likes.includes(userId)) {
            console.log(post.likes.indexOf(userId));
            post.likes.splice(post.likes.indexOf(userId), 1);
            console.log("dislike");
          } else {
            post.likes.push(userId);
            console.log("like");
          }
        }

        return post;
      });

      for (let post of state.posts) {
        if (post.$id === postId) {
          console.log(post);
        }
      }

      state.loading = false;
    },
  },
});

export const { getPosts, addPost, addLikesToAPost } = postsReducer.actions;

export default postsReducer.reducer;
