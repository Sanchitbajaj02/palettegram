"use client";

import { account, db, ID, palettegramDB, usersCollection, baseURL } from "./appwrite.config";

/**
 * @description Register the user into the database
 * @param {Object} userData
 * @returns {Object} authResponse
 */
const registerUser = async (userData: any) => {
  try {
    // console.log("register: ", userData.email, userData.password, userData.fullName);

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
    console.log(error);
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
 * @description send a link to email for updating user's password
 * @param {string} userData
 * @returns {Object} response
 */
const forgotpassword = async (email: string) => {
  try {
    // console.log("login:", userData?.email, userData?.password);
    if (!email) {
      throw new Error("email is needed ");
    }
    const response = await account.createRecovery(email, `http://localhost:3000/updatepassword`);
    return response;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

/**
 * @description Update user's password
 * @param {Object} userData
 * @returns {Object} response
 */
const updatepassword = async (userData: any) => {
  try {
    if (!userData.password || !userData.confirmpassword) {
      throw new Error("Both fields are necessary");
    }
    const response = await account.updateRecovery(userData.USER_ID, userData.SECRET, userData.password, userData.confirmpassword);
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
  } catch (error) {
    console.log("get current user error:", error);
  }

  return null;
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

    const resp = await db.createDocument(palettegramDB, usersCollection, ID.unique(), {
      email: session.email,
      fullName: session.name,
      createdAt: session.$createdAt,
      isVerified: session.emailVerification,
      accountId: session.$id,
      username: username,
    });

    // console.log("DB log response:", resp);

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
 * **Work**: Returns the status of the user
 * @returns {boolean} loggedin response
 */
const isLoggedIn = async (): Promise<any> => {
  try {
    const loggedIn = await getCurrentUser();

    return loggedIn;
  } catch (error) {
    console.log(error);
  }

  return false;
};

/**
 * @description get single user data based on account id
 * @param id
 * @returns
 */
const getSingleUser = async (id: string) => {
  try {
    const tweets = await db.getDocument(palettegramDB, usersCollection, id);
    if (!tweets) {
      throw new Error();
    }
    return tweets;
  } catch (error: any) {
    console.log(error);
  }
};

export { registerUser, verifyUser, loginUser, forgotpassword, updatepassword, logoutUser, isLoggedIn, getSingleUser, getCurrentUser };
