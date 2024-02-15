"use client";

import { account, db, ID, Query, palettegramDB, bookmarksCollection } from "./appwrite.config";

/**
 * @abstract filtering bookmarks
 * @param {string[]} bookmarks
 * @param {string} postId
 * @returns {string[]}
 */
const removePostIdFromBookmarks = function (bookmarks: string[], postId: string): string[] {
  let idx = bookmarks.indexOf(postId);

  let beforeIdx = bookmarks.slice(0, idx);

  let afterIdx = bookmarks.slice(idx + 1, bookmarks.length);

  return [...beforeIdx, ...afterIdx];
};

const getBookmarks = async (accountId: string) => {
  try {
    const getSavedBookmarkData = await db.listDocuments(palettegramDB, bookmarksCollection, [
      Query.equal("accountId", accountId),
    ]);

    return getSavedBookmarkData;
  } catch (error) {
    console.log(error);
  }
};

const saveBookmark = async (accountId: string, postId: string) => {
  try {
    const getSavedBookmarkData = await getBookmarks(accountId);

    if (!getSavedBookmarkData) {
      throw new Error("Account does not exist");
    }

    const documentId = getSavedBookmarkData.documents[0].$id;
    let oldBookmarkArray = getSavedBookmarkData.documents[0].bookmark;

    oldBookmarkArray.push(postId);

    const updatedData = await db.updateDocument(palettegramDB, bookmarksCollection, documentId, {
      bookmark: oldBookmarkArray,
    });

    if (!updatedData) {
      throw new Error();
    }

    return updatedData;
  } catch (error) {
    throw new Error();
  }
};

const removeBookmark = async (accountId: string, postId: string) => {
  try {
    const getSavedBookmarkData = await getBookmarks(accountId);

    if (!getSavedBookmarkData) {
      throw new Error("Account does not exist");
    }

    const documentId = getSavedBookmarkData.documents[0].$id;
    let oldBookmarkArray = getSavedBookmarkData.documents[0].bookmark;

    let newBookmarkArray: string[] = removePostIdFromBookmarks(oldBookmarkArray, postId);

    const updatedData = await db.updateDocument(palettegramDB, bookmarksCollection, documentId, {
      bookmark: newBookmarkArray,
    });

    if (!updatedData) {
      throw new Error();
    }

    return updatedData;
  } catch (error) {
    throw new Error();
  }
};

const createBookmarkEntry = async (accountId: string, postId: string) => {
  try {
    const bookmarkDocs = await db.createDocument(palettegramDB, bookmarksCollection, ID.unique(), {
      accountId: accountId,
      bookmark: [postId],
    });

    if (!bookmarkDocs) {
      throw new Error("Account does not exist");
    }

    return bookmarkDocs;
  } catch (error) {
    throw new Error();
  }
};

export { saveBookmark, removeBookmark, createBookmarkEntry, getBookmarks };
