"use client";

import { account, db, ID, Query, palettegramDB, bookmarksCollection } from "./appwrite.config";

const saveBookmark = (accountId: string, postId: string) => {};

const removeBookmark = async (accountId: string, postId: string) => {
  try {
    console.log(accountId, postId);
    
    const getSavedBookmarkData = await db.listDocuments(palettegramDB, bookmarksCollection, [
      Query.equal('accountId', accountId)
    ])

    if (!getSavedBookmarkData) {
      throw new Error("Account does not exist")
    }

    const documentId = getSavedBookmarkData.documents[0].$id;

    const updatedData = await db.updateDocument(palettegramDB, bookmarksCollection, documentId, {
      
    })


  } catch (error) {
    throw new Error();
  }
};

const createBookmarkEntry = (accountId: string, postId: string) => {};

export { saveBookmark, removeBookmark, createBookmarkEntry };
