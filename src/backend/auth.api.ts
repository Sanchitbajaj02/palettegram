"use client";
import { verificationResponseType } from "@/types/auth";

import { account, db, ID, palettegramDB, usersCollection, Query } from "./appwrite.config";
import { generateAvatar } from "@/helper/avatarGenerator";
import { setCookie } from "nookies";

/**
 * @abstract Register the user into the database
 * @param {Object} userData
 * @returns authResponse
 */

const register = async (userData: {
  email: string;
  fullName: string;
  password: string;
  confirmpassword: string;
}) => {
  try {
    // const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    //it will check that password must contain atleast one digit ,atleast one alphabet , atleast one special character and must be of atleast length 8

    let username = userData.email.split("@")[0];

    const authResponse = await account.create(
      ID.unique(),
      userData.email,
      userData.password,
      userData.fullName,
    );

    if (!authResponse || Object.keys(authResponse).length <= 0) {
      throw new Error("User registration failed");
    }

    const session = await login(userData);

    if (!session) {
      throw new Error("Session failed");
    }

    const createVerify = await account.createVerification(
      `${process.env.NEXT_PUBLIC_BASE_URL}/verify`,
    );

    if (!createVerify) {
      throw new Error("Error sending verification email");
    }

    const authResp = await account.updatePrefs({
      username: username,
    });

    return authResp;
  } catch (error: any) {
    console.log(error + "Message");
    throw new Error(error.message);
  }
};

/**
 * @abstract verifys the user based on the userId and secret sent to the user's email
 * @param {String} accountId
 * @param {String} secret
 * @returns response status
 */

const verifyUser = async (accountId: string, secret: string) => {
  let response: verificationResponseType = {
    status: false,
    data: null,
  };
  try {
    const verifyResponse = await account.updateVerification(accountId, secret);

    if (!verifyResponse) {
      throw new Error("User not verified");
    }
    const userSession = await getUserSession();

    if (!userSession || Object.keys(userSession).length < 0) {
      throw new Error("Session not maintained");
    }

    const dbData = await saveDataToDatabase(userSession);

    response = {
      status: true,
      data: dbData,
    };
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }

  return response;
};

/**
 * @abstract log in the user based on emailId and password
 * @param {string} accountId
 * @returns response
 */

const getUserByAccountId = async (accountId: string) => {
  try {
    const singleUser = await db.listDocuments(palettegramDB, usersCollection, [
      Query.equal("accountId", accountId),
    ]);

    if (!singleUser || singleUser.documents.length < 1) {
      throw new Error("user not exists");
    }

    return singleUser.documents[0];
  } catch (error: any) {
    console.log(error);
  }
};

const getUserByUserId = async (userId: string) => {
  try {
    const user = await db.listDocuments(palettegramDB, usersCollection, [
      Query.equal("$id", userId),
    ]);

    if (!palettegramDB || !usersCollection || !userId) {
      throw new Error("Invalid input for getting user details");
    }

    if (!user) {
      throw new Error();
    }
    console.log("userData comming by userId -> ", user);
    return user.documents[0];
  } catch (error: any) {
    console.log(error);
  }
};

const login = async ({ email, password }: { email: string; password: string }) => {
  try {
    const response = await account.createEmailSession(email, password);

    if (!response) {
      throw new Error("Login failed");
    }

    const accountId: string = response && response.userId;

    const user = await getUserByAccountId(accountId);

    return user;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

/**
 * @abstract send a link to user's email
 * @param {string} userEmail
 */
const forgotpassword = async (userEmail: string) => {
  try {
    // console.log("login:", userData?.email, userData?.password);
    if (!userEmail) {
      throw new Error("email is empty");
    }
    const response = await account.createRecovery(
      userEmail,
      `${process.env.NEXT_PUBLIC_BASE_URL}/updatepassword`,
    );
    return response;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

/**
 * @abstract update user's password
 * @param {Object} userData
 * @returns {Object} response
 */

const updatepassword = async (userData: any) => {
  const { password, confirmpassword, USER_ID, SECRET } = userData;
  try {
    if (
      userData.password === "" ||
      userData.confirmpassword === "" ||
      userData.USER_ID === "" ||
      userData.SECRET === " "
    ) {
      throw new Error("Request has failed");
    }
    const response = await account.updateRecovery(USER_ID, SECRET, password, confirmpassword);
    return response;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

/**
 * @abstract returns the state of current user
 * @returns Session
 */
const getUserSession = async () => {
  try {
    return account.get();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/**
 * @abstract logs out the user by clearing current session
 * @returns session
 */
const logoutUser = async () => {
  return await account.deleteSession("current");
};

/**
 * @abstract Save Data into Appwrite Database
 * @param {Object} session
 * @returns {Object} dbResponse
 */
const saveDataToDatabase = async (session: any) => {
  try {
    const avatar = generateAvatar(session.name);
    const resp = await db.createDocument(palettegramDB, usersCollection, ID.unique(), {
      email: session.email,
      fullName: session.name,
      isVerified: session.emailVerification,
      accountId: session.$id,
      username: session.prefs.username,
      avatarURL: avatar,
    });
    if (!resp) {
      throw new Error("Database not working");
    }
    console.log(resp);
    setCookie(null, "userId", resp.$id);

    return resp;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

/**
 * @abstract get single user data based on account id
 * @param  {String} id
 * @returns
 */

const loginWithGoogle = async () => {
  account.createOAuth2Session(
    "google",
    "http://localhost:3000/feed", // Success URL
    "http://localhost:3000", // Failure URL
  );
};

// const getUserDetails = async (userId: string) => {
//   try {
//     console.log(userId, "acountId");

//     if (!palettegramDB || !usersCollection || !userId) {
//       throw new Error("Invalid input for getting user details");
//     }

//     const user = await db.listDocuments(palettegramDB, usersCollection, [
//       Query.equal("$id", userId),
//     ]);
//     if (!user) {
//       throw new Error("User not found");
//     }
//     return user.documents.map((doc) => ({ accountId: doc.accountId, fullName: doc.fullName }));
//   } catch (error) {
//     console.error(error);
//   }
// };

export {
  register,
  verifyUser,
  login,
  logoutUser,
  getUserByAccountId,
  forgotpassword,
  updatepassword,
  // getUserDetails,
  loginWithGoogle,
  getUserByUserId,
};
