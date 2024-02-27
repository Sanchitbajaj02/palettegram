"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { BookmarkInitType, Bookmark } from "@/types/index.d";

const initialState: any = {
  postId: [],
  userId: "",
  error: false,
  loading: false,
};

const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    saveBookmarkToStore: (state, action) => {
      state.loading = true;
      state.userId = action.payload.userId;
      state.postId = action.payload.postId;
      state.error = false;
      state.loading = false;
    },
    getBookmarks: (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.error = false;
      state.loading = false;
    },
  },
});

export const { saveBookmarkToStore, getBookmarks } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
