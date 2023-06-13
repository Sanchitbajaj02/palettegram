import { ID, Query } from "appwrite";
import { account, db } from "./appwrite.config";

const palettegramDB = process.env.REACT_APP_DATABASE_ID;
const usersCollection = process.env.REACT_APP_USER_COLLECTION;
const postsCollection = process.env.REACT_APP_POSTS_COLLECTION;

const registerUser = async (userData) => {
  try {
    const authResponse = await account.create(
      ID.unique(),
      userData.email,
      userData.password,
      userData.fullName,
    );
    console.log(authResponse);
    if (authResponse && Object.keys(authResponse).length > 0) {
      const session = await account.createEmailSession(
        userData.email,
        userData.password,
      );

      if (session) {
        console.log(process.env.REACT_APP_BASE_URL);
        const createVerify = await account.createVerification(
          `${process.env.REACT_APP_BASE_URL}/verify`,
        );

        if (createVerify && createVerify["$id"]) {
          return authResponse;
        } else {
          throw Error("Error sending verification email");
        }
      } else {
        throw Error("Session failed");
      }
    } else {
      throw Error("Authentication failed");
    }
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

const verifyUser = async (userId, secret) => {
  let response = {
    status: false,
    data: null,
  };
  try {
    const verifyResponse = await account.updateVerification(userId, secret);
    if (verifyResponse) {
      const session = await account.get();

      console.log(session);

      if (session && Object.keys(session).length > 0) {
        const resp = await db.createDocument(
          palettegramDB,
          usersCollection,
          ID.unique(),
          {
            email: session.email,
            fullName: session.name,
            createdAt: session["$createdAt"],
          },
        );

        if (resp) {
          response = {
            status: true,
            data: resp,
          };
        } else {
          throw new Error("Database not working");
        }
      } else {
        throw new Error("Session not maintained");
      }
    }
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return response;
};

const getAccount = () => {
  return account.get();
};

const loginUser = async (userData) => {
  console.log(userData);
  try {
    const response = await account.createEmailSession(
      userData.email,
      userData.password,
    );

    if (response && response["$id"]) {
      const userAccount = await getAccount();

      if (userAccount && userAccount.emailVerification) {
        return userAccount;
      }
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

const getCurrentUser = async () => {
  try {
    return await account.getCurrentUser();
  } catch (error) {
    console.log(error);
  }
};

const createPost = async (data) => {
  console.log(data);
  try {
    const tweet = await db.createDocument(
      palettegramDB,
      postsCollection,
      ID.unique(),
      data,
    );
    if (tweet) {
      return tweet;
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllPosts = async () => {
  try {
    const tweets = await db.listDocuments(palettegramDB, postsCollection);
    if (tweets) {
      return tweets;
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllUserPosts = async (userId) => {
  try {
    const tweets = await db.listDocuments(palettegramDB, postsCollection, [
      Query.equal("userId",userId),
    ]);
    if (tweets) {
      return tweets;
    }
  } catch (error) {
    console.log(error);
  }
};

export {
  registerUser,
  verifyUser,
  getAccount,
  loginUser,
  getCurrentUser,
  createPost,
  getAllPosts,
  getAllUserPosts
};
