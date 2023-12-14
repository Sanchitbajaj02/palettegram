"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { setCookie } from "nookies";

import { BookmarkInitType, Bookmark } from "@/types/index.d";

const initialState: any = {
  bookmark: [],
  accountId: "",
  error: false,
  loading: false,
};

const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    saveBookmarkToStore: (state, action) => {
      state.loading = true;
      state.accountId = action.payload.accountId;
      state.bookmark = action.payload.bookmark;
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
