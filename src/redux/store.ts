"use client";
import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "@/redux/reducers/postsReducer";
import authReducer from "@/redux/reducers/authReducer";
import bookmarkReducer from "@/redux/reducers/bookmarkReducer";
import cursorReducer from "@/redux/reducers/cursorReducer";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
    bookmarks: bookmarkReducer,
    cursor: cursorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;