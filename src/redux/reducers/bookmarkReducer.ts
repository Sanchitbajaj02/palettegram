"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { setCookie } from "nookies";

type Bookmark = {
  accountId: string;
  bookmarks: string[];
};

export type BookmarkInitType = {
  data: Bookmark[];
  error: boolean;
  loading: boolean;
};

const initialState: BookmarkInitType = {
  data: [
    {
      accountId: "lorem",
      bookmarks: ["a", "b", "c"],
    },
    {
      accountId: "ipsum",
      bookmarks: ["a", "b", "c"],
    },
    {
      accountId: "651d8fe8b7acfb38b74a",
      bookmarks: ["a", "b", "c", "65377973a36363480660", "651d9b163a46461f1c0f"],
    },
  ],
  error: false,
  loading: false,
};

const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    saveBookmark: (state, action) => {
      state.loading = true;
      state.data.push(action.payload);
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

export const { saveBookmark, getBookmarks } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
