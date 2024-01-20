import {
  db,
  storage,
  ID,
  Query,
  palettegramDB,
  usersCollection,
  postsCollection,
  bucketStorage,
} from "./appwrite.config";

/**
 * @description Save a single post to database
 * @param data
 * @returns
 */
const savePostToDb = async (data: any) => {
  try {
    const post = await db.createDocument(palettegramDB, postsCollection, ID.unique(), data);
    if (!post) {
      throw new Error("Error in uploading data into database");
    }

    return post;
  } catch (error: any) {
    console.log(error);
  }
};

/**
 * @description get all posts present in the database
 * @returns {Object} posts db
 */
const getAllPosts = async () => {
  try {
    const tweets = await db.listDocuments(palettegramDB, postsCollection);
    if (!tweets) {
      throw new Error("Error fetching data");
    }

    return tweets;
  } catch (error: any) {
    console.log(error);
  }
};

/**
 * @description gets single document based on the id
 * @param id
 * @returns
 */
const getSinglePost = async (id: string) => {
  try {
    const tweets = await db.getDocument(palettegramDB, postsCollection, id);
    if (tweets) {
      return tweets;
    }
  } catch (error: any) {
    console.log(error);
  }
};

/**
 * @description get user post based on account id
 * @param userId
 * @returns
 */
const getAllUserPosts = async (userId: string) => {
  try {
    const tweets = await db.listDocuments(palettegramDB, postsCollection, [
      Query.equal("userId", userId),
    ]);

    if (tweets) {
      return tweets;
    }
  } catch (error: any) {
    console.log(error);
  }
};

const removePost = async (id: string) => {
  try {
    const resp = await db.updateDocument(palettegramDB, postsCollection, id, {
      isActive: false,
    });
    if (resp) {
      return resp;
    }
  } catch (error: any) {
    console.log(error);
  }
};

/**
 * @description like tweet api
 * @param tweet
 * @returns
 */
const likeTweet = async (tweet: any) => {
  try {
    const tweets = await db.updateDocument(palettegramDB, postsCollection, tweet.$id, {
      likes: tweet.likes,
    });
    if (tweets) {
      return tweets;
    }
  } catch (error: any) {
    console.log(error);
  }
};

/**
 * @description image adding api. Save image into bucket
 * @param image
 * @returns
 */
const addNewImage = async (image: any) => {
  try {
    const resImage = await storage.createFile(bucketStorage, ID.unique(), image);
    if (!resImage) {
      throw new Error("File not found");
    }
    return resImage;
  } catch (error: any) {
    console.log(error);
  }
};

/**
 * @description get image url from bucket
 * @param imageId
 * @returns
 */
const getImageUrl = (imageId: string) => {
  try {
    if (!imageId) {
      throw new Error("Image can not be uploaded");
    }

    const url = `https://cloud.appwrite.io/v1/storage/buckets/${bucketStorage}/files/${imageId}/view?project=${process.env.NEXT_PUBLIC_PROJECT_ID}`;

    return url;
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description delete image from bucket
 * @param id
 * @returns
 */
const deleteImage = async (id: string) => {
  try {
    const resImage = await storage.deleteFile(bucketStorage, id);
    if (resImage) {
      return resImage;
    }
  } catch (error: any) {
    console.log(error);
  }
};

const addComment = async (id: string, comment: any) => {
  try {
    const res = await db.updateDocument(palettegramDB, postsCollection, id, {
      comments: comment,
    });
    if (res) {
      return res;
    }
  } catch (error: any) {
    console.log(error);
  }
};

export {
  savePostToDb,
  getAllPosts,
  getAllUserPosts,
  getSinglePost,
  likeTweet,
  addNewImage,
  deleteImage,
  getImageUrl,
  addComment,
  removePost,
};
