"use client";

import { account, db, ID, palettegramDB, usersCollection, Query } from "./appwrite.config";
import { generateAvatar } from './avatarGenerator';

/**
 * @description Register the user into the database
 * @param {Object} userData
 * @returns {Object} authResponse
 */
const registerUser = async (userData: any) => {
  try {

    // console.log("register: ", userData.email, userData.password, userData.fullName);
    if (userData.password != userData.confirmpassword) {
      throw Error("not matching");
    }
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; //it will check that password must contain atleast one digit ,atleast one alphabet , atleast one special character and must be of atleast length 8

    if (!passwordRegex.test(userData.password)) {
      throw Error("password is not strong");
    }
    const avatar = generateAvatar(userData.fullName);

    const authResponse = await account.create(
      ID.unique(),
      userData.email,
      userData.password,
      userData.fullName,
    );

    // console.log("Auth Response:", authResponse);

    if (!authResponse || Object.keys(authResponse).length <= 0) {
      throw Error("User registration failed");
    }

    const session = await loginUser(userData);

    if (!session) {
      throw Error("Session failed");
    }

    const createVerify = await account.createVerification(
      `${process.env.NEXT_PUBLIC_BASE_URL}/verify`,
    );

    // console.log("Verify Object:", createVerify);

    if (!createVerify && !createVerify["$id"]) {
      throw Error("Error sending verification email");
    }

    return authResponse;
  } catch (error: any) {
    console.log(error + "Message");
    throw new Error(error.message);
  }
};

/**
 * @description verifys the user based on the userId and secret sent to the user's email
 * @param {String} userId
 * @param {String} secret
 * @returns {Object} response status
 */
const verifyUser = async (userId: string, secret: string) => {
  type Resp = {
    status: boolean;
    data: any;
  };
  let response: Resp = {
    status: false,
    data: null,
  };
  try {
    const verifyResponse = await account.updateVerification(userId, secret);

    // console.log("Verify response:", verifyResponse);

    if (!verifyResponse) {
      throw new Error("User not verified");
    }
    const session = await getCurrentUser();

    if (!session || Object.keys(session).length < 0) {
      throw new Error("Session not maintained");
    }

    const dbData = await saveDataToDatabase(session);

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
 * @description log in the user based on emailId and password
 * @param {Object} userData
 * @returns {Object} response
 */
const loginUser = async (userData: any) => {
  try {
    // console.log("login:", userData?.email, userData?.password);
    if (!userData?.email || !userData?.password) {
      throw new Error("email or password is empty");
    }

    const response = await account.createEmailSession(userData?.email, userData?.password);

    // console.log("Email session:", response);

    if (!response || !response["$id"]) {
      throw new Error("Login failed");
    }

    return response;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

/**
 * @description send a link to user's email
 * @param {string} userEmail
 * @returns {Object} response
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
 * @description update user's password
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
 * @description returns the state of current user
 * @returns {Object} Session
 */
const getCurrentUser = async () => {
  try {
    return account.get();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/**
 * @description logs out the user by clearing current session
 * @returns {Object} returns session
 */
const logoutUser = async () => {
  return await account.deleteSession("current");
};

/**
 * @description Save Data into Appwrite Database
 * @param {Object} session
 * @returns {Object} dbResponse
 */
const saveDataToDatabase = async (session: any) => {
  try {
    let username = session.email.split("@")[0];
    console.log(username);
    const avatar = generateAvatar(session.name);
    const resp = await db.createDocument(palettegramDB, usersCollection, ID.unique(), {
      email: session.email,
      fullName: session.name,
      isVerified: session.emailVerification,
      accountId: session.$id,
      username: username,
      avatarURL: avatar, 
    });
    if (!resp) {
      throw new Error("Database not working");
    }

    return resp;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

/**
 * @description get single user data based on account id
 * @param id
 * @returns
 */
const getSingleUser = async (id: string) => {
  try {
    const tweets = await db.listDocuments(palettegramDB, usersCollection, [
      Query.search("accountId", id),
    ]);
    if (!tweets) {
      throw new Error();
    }
    return tweets;
  } catch (error: any) {
    console.log(error);
  }
};

const loginWithGoogle = async () => {
  account.createOAuth2Session(
    "google",
    "http://localhost:3000/feed", // Success URL
    "http://localhost:3000", // Failure URL
  );
};

const getUserDetails = async (accountId: string) => {
  try {
    if (!palettegramDB || !usersCollection || !accountId) {
      throw new Error("Invalid input for getting user details");
    }

    const user = await db.listDocuments(palettegramDB, usersCollection, [
      Query.equal("accountId", accountId),
      Query.select(["accountId", "fullName"]),
    ]);

    if (!user) {
      throw new Error("User not found");
    }
    return user.documents.map((doc) => ({ accountId: doc.accountId, fullName: doc.fullName }));
  } catch (error) {
    console.error(error);
  }
};

export {
  registerUser,
  verifyUser,
  loginUser,
  logoutUser,
  getSingleUser,
  getCurrentUser,
  forgotpassword,
  updatepassword,
  getUserDetails,
  loginWithGoogle,
};
