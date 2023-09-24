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

const getSinglePost = async (id: string) => {
  // console.log(id);
  try {
    const tweets = await db.getDocument(palettegramDB, postsCollection, id);
    if (tweets) {
      return tweets;
    }
  } catch (error: any) {
    console.log(error);
  }
};

const getSingleUser = async (id: string) => {
  try {
    const tweets = await db.getDocument(palettegramDB, usersCollection, id);
    if (tweets) {
      // console.log(tweets);
      return tweets;
    }
  } catch (error: any) {
    console.log(error);
  }
};

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

const likeTweet = async (tweet: any) => {
  try {
    // console.log(tweet.$id);
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

export {
  savePostToDb,
  getSingleUser,
  getAllPosts,
  getAllUserPosts,
  getSinglePost,
  likeTweet,
  addNewImage,
  deleteImage,
  getImageUrl,
};
