"use client";
import { account, db, ID, palettegramDB, usersCollection, Query } from "./appwrite.config";
import { generateAvatar } from "@/helper/avatarGenerator";
import { Models, OAuthProvider } from "appwrite";

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

    const session = await account.createEmailPasswordSession(userData.email, userData.password);

    if (!session) {
      throw new Error("Session failed");
    }

    const authResp = await account.updatePrefs({
      username: username,
    });

    const dbData = await saveDataToDatabase(authResp);

    if (!dbData) {
      throw new Error("User data can't be saved properly");
    }

    // send verification email in production mode
    if (process.env.NODE_ENV === "production") {
      const createVerify = await account.createVerification(
        `${process.env.NEXT_PUBLIC_BASE_URL}/verify`,
      );

      if (!createVerify) {
        throw new Error("Error sending verification email");
      }
    }

    return dbData;
  } catch (error: any) {
    console.log(error, "Message");
    throw new Error(error.message);
  }
};

/**
 * @abstract verifys the user based on the userId and secret sent to the user's email
 * @param {String} accountId
 * @param {String} secret
 * @returns {Boolean} status
 */

const verifyUser = async (accountId: string, secret: string) => {
  try {
    // console.log("data:", accountId, secret);

    const verifyResponse = await account.updateVerification(accountId, secret);

    if (!verifyResponse) {
      throw new Error("User not verified");
    }
    const currentUser = await db.listDocuments(palettegramDB, usersCollection, [
      Query.equal("accountId", verifyResponse.userId),
    ]);

    if (!currentUser) {
      throw new Error("Current user might be corrupted");
    }

    const result = db.updateDocument(palettegramDB, usersCollection, currentUser.documents[0].$id, {
      isVerified: true,
    });

    if (!result) {
      throw new Error("Error in verifying user");
    }

    return {
      userId: currentUser.documents[0].$id,
      accountId: verifyResponse.userId,
      isVerified: true,
    };
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
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

    return singleUser && singleUser.documents[0];
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
    return user.documents[0];
  } catch (error: any) {
    console.log(error);
  }
};

const login = async (email: string, password: string) => {
  // Delete current session, if any
  try {
    await account.deleteSession("current");
  } catch (error: any) {
    if (error?.type !== "general_unauthorized_scope") {
      throw new Error("Login failed");
    }
  }

  try {
    const session = await account.createEmailPasswordSession(email, password);
    const { userId: accountId, expire } = session;
    const user = await getUserByAccountId(accountId);
    return { user, expires: new Date(expire) };
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

    const getOldUserDetails = await db.listDocuments(palettegramDB, usersCollection, [
      Query.equal("email", userEmail),
    ]);

    if (!getOldUserDetails) {
      throw new Error("user does not exist");
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
    if (password === "" || confirmpassword === "" || USER_ID === "" || SECRET === " ") {
      throw new Error("Request has failed");
    }
    const response = await account.updateRecovery(USER_ID, SECRET, password);
    return response;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

/**
 * @abstract returns the details of currently logged in user
 * @returns Session
 */
const getUserSession = async () => {
  try {
    const user = await account.get();
    return user;
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
      isVerified:
        process.env.NODE_ENV === "development"
          ? true // user verified by default in dev environment
          : session.emailVerification,
      accountId: session.$id,
      username: session?.prefs?.username,
      avatarURL: avatar,
    });
    if (!resp) {
      throw new Error("Database not working");
    }
    // console.log(resp);
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
const getSingleUser = async (email: string) => {
  try {
    const resp = await db.listDocuments(palettegramDB, usersCollection, [
      Query.search("Email", email),
    ]);

    return resp;
  } catch (error: any) {
    console.log(error);
  }
};

/* const loginWithGoogle = async () => {
  account.createOAuth2Session(
    "google",
    "http://localhost:3000/feed", // Success URL
    "http://localhost:3000", // Failure URL
  );
}; */

const loginWithGithub = async () => {
  try {
    account.createOAuth2Session(
      OAuthProvider.Github,
      `${process.env.NEXT_PUBLIC_BASE_URL}/feed`,
      `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
      ["repo", "user"],
    );
    /*   const userSession = await getUserSession();

    const resp = saveDataToDatabaseForOauth(userSession); */
  } catch (error) {
    console.log(error);
  }
};

const saveDataToDatabaseForOauth = async (session: Models.User<Models.Preferences>) => {
  try {
    const currentUser = await db.listDocuments(palettegramDB, usersCollection, [
      Query.equal("email", session.email),
    ]);

    let resp;

    if (currentUser.documents.length === 0) {
      const avatar = generateAvatar(session.name);
      resp = await db.createDocument(palettegramDB, usersCollection, ID.unique(), {
        email: session.email,
        fullName: session.name,
        isVerified: session.emailVerification,
        accountId: session.$id,
        username: session?.prefs?.username,
        avatarURL: avatar,
      });
    }
    if (!resp) {
      throw new Error("Database not working");
    }
    // console.log(resp);
    return resp;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
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
  loginWithGithub,
  getUserByUserId,
};
