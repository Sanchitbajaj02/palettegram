import { Account, Client, Databases, Storage, ID, Query } from "appwrite";

const appwriteClient = new Client();

appwriteClient
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.REACT_APP_PROJECT_ID);

const account = new Account(appwriteClient);
const db = new Databases(appwriteClient);
const storage = new Storage(appwriteClient);

// appwrite keys
const palettegramDB = process.env.REACT_APP_DATABASE_ID;
const usersCollection = process.env.REACT_APP_USER_COLLECTION;
const postsCollection = process.env.REACT_APP_POSTS_COLLECTION;
const bucketStorage = process.env.REACT_APP_BUCKET_ID;

export { appwriteClient, account, db, storage, ID, Query };

export { palettegramDB, usersCollection, postsCollection, bucketStorage };
