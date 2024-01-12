"use client";
import { Account, Client, Databases, Storage, ID, Query } from "appwrite";
const appwriteClient = new Client();
appwriteClient
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(String(process.env.NEXT_PUBLIC_PROJECT_ID));

const account = new Account(appwriteClient);
const db = new Databases(appwriteClient);
const storage = new Storage(appwriteClient);

// appwrite keys
const palettegramDB = String(process.env.NEXT_PUBLIC_DATABASE_ID);
const usersCollection = String(process.env.NEXT_PUBLIC_USER_COLLECTION);
const postsCollection = String(process.env.NEXT_PUBLIC_POSTS_COLLECTION);
const bookmarksCollection = String(process.env.NEXT_PUBLIC_BOOKMARKS_COLLECTION);
const bucketStorage = String(process.env.NEXT_PUBLIC_BUCKET_ID);

export { appwriteClient, account, db, storage, ID, Query };

export { palettegramDB, usersCollection, postsCollection, bookmarksCollection, bucketStorage };
